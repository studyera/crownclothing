import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserwithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/from-input.component";
import "./sign-in-form.styles.scss";
import Button, { Button_Type_Classes } from "../button/button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await signInAuthUserwithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("incorrect password");
      } else if (error.code === "auth/user-not-found") {
        alert("email does not exist please register");
      }
      console.log("user creation encountered an error", error);
    }
  };
  const SignInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          lable="Email"
          required
          type={"email"}
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          lable="Password"
          required
          type={"password"}
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">SignIn</Button>
          <Button
            type="button"
            buttonType={Button_Type_Classes.google}
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
