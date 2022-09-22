import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinkContainer,
} from "./navigation.styles.jsx";
import "./navigation.styles.jsx";
import { userSelector } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
const Navigation = () => {
  const currentUser=useSelector(userSelector)
  // const { currentUser } = useContext(UserContext);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen); 
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinkContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={SignOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SignIn</NavLink>
          )}
          <CartIcon />
        </NavLinkContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
