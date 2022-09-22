import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { useDispatch, useSelector } from "react-redux";
import "./product-card.styles.scss";
import Button,{Button_Type_Classes} from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems=  useSelector(selectCartItems);
  // const { addItemToCart } = useContext(CartContext);
  const addProductToCart=()=>{
    dispatch(addItemToCart(cartItems,product))
    //addItemToCart(product)
  }
  const dispatch = useDispatch();
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={Button_Type_Classes.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};
export default ProductCard;
