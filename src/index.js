import React from "react";
import { render } from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { Store,persistor } from "./store/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "./context/user.context";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./context/categories.context";
import { CartProvider } from "./context/cart.context";
const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
