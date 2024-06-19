import classes from "./cart-button.module.css";
import CartIcon from "../../assets/cart.png";
import BackdropContext from "../../store/backdrop-context";
import CartItemContext from "../../store/cart-items-context";
import { useContext } from "react";
const CartButton = (props) => {
  const backdropCtx = useContext(BackdropContext);
  const cartItemCtx = useContext(CartItemContext);

  return (
    <button className={classes["cart-btn"]} onClick={backdropCtx.onShowCart}>
      <span className={classes.icon}>
        <img src={CartIcon} />
      </span>
      <span className={classes.label}>Your Cart</span>
      <span className={classes.badge}>{`${
        Object.keys(cartItemCtx.cartItemList).length
      }`}</span>
    </button>
  );
};
export default CartButton;
