
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { userSelector } from "../../store/user/user.selector";
import { PaymentButton } from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, {
  Button_Type_Classes,
} from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount =  useSelector(selectCartTotal);
  const currentUser = useSelector(userSelector);
  const [isProcessingPayment, setIsProcessingPayment]= useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount*100 }),
    }).then((res) => res.json());

    // console.log(response);
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);

    const paymentResult= await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details:{
          name: currentUser?currentUser.displayName:'guest'
        }
      }
    })

    setIsProcessingPayment(false);

    if(paymentResult.error){
      alert(paymentResult.error.message);
    }else{
      if(paymentResult.paymentIntent.status==="succeeded"){
        alert('payment Successful');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={Button_Type_Classes.inverted}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
