import React from "react";
import { render } from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { Store, persistor } from "./store/store";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "./context/user.context";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./context/categories.context";
import { CartProvider } from "./context/cart.context";
import { stripePromise } from "./utils/stripe/stripe.utils";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
