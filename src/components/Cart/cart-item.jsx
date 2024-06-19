import { useContext, useEffect, useState } from "react";
import classes from "../Cart/cart-item.module.css";
import CartItemContext from "../../store/cart-items-context";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.qty);
  const cartItemCtx = useContext(CartItemContext);

  useEffect(() => {
    cartItemCtx.onUpdateCartItem(props.id, qty);
  }, [qty]);

  const decreaseQuantity = () => {
    // console.log(typeof props.qty);
    // console.log("decreaseQuantity", parseInt(qty) - 1);
    setQty((preQty) => {
      return parseInt(preQty) - 1;
    });
  };

  const increaseQuantity = () => {
    // console.log(typeof props.qty);
    // console.log("increaseQuantity", parseInt(qty) + 1);
    setQty((preQty) => {
      return parseInt(preQty) + 1;
    });
  };

  return (
    <tr>
      <td className={classes["item-name"]}>{props.name}</td>
      <td className={classes["attr"]}>
        <div className={classes["qty-ctrls"]}>
          <button
            className={classes["decrease-qty"]}
            onClick={decreaseQuantity}
          >
            -
          </button>
          <span className={classes["attr"]}>{qty}</span>
          <button
            className={classes["increase-qty"]}
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td className={classes["attr"]}>{props.price}</td>
      <td className={classes["attr"]}>{qty * props.price}</td>
    </tr>
  );
};
export default CartItem;
