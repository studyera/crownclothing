import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart.context";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, productTotalQuantity } =
    useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{productTotalQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
