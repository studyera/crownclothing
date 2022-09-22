import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart.context";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";
import { selectIsCartOpen, selectCartCount } from "../../store/cart/cart.selector";
import { useSelector,useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
const CartIcon = () => {
  const dispatch= useDispatch();
  const isCartOpen= useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  // const { isCartOpen, setIsCartOpen, cartCount } =
  //   useContext(CartContext);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
