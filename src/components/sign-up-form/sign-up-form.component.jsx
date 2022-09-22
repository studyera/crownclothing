import { useState } from "react";
import {
  createAuthUserwithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/from-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formFields.password !== formFields.confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      const { user } = await createAuthUserwithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
    resetFormField();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          lable="Display Name"
          required
          type={"text"}
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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

        <FormInput
          lable="Confirm Password"
          required
          type={"password"}
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">signUp</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
