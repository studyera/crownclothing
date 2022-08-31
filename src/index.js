import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { UserProvider } from "./context/user.context";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./context/categories.context";
import { CartProvider } from "./context/cart.context";
const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
          <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
