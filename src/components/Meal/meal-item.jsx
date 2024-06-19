import { useContext, useRef } from "react";
import classes from "./meal-item.module.css";
import CartItemContext from "../../store/cart-items-context";
import BackdropContext from "../../store/backdrop-context";

const MealItem = (props) => {
  const cartItemCtx = useContext(CartItemContext);
  const backdropCtx = useContext(BackdropContext);

  const qtyRef = useRef(null);

  const addItemToCart = (event) => {
    event.preventDefault();
    if (qtyRef.current.value > 0) {
      cartItemCtx.onAddCartItem(props.item, qtyRef.current.value);
      qtyRef.current.value = 0;
    } else {
      backdropCtx.onShowSnackbar("Quantity of item must be more than 0");
    }
  };

  return (
    <div className={classes["meal-item"]}>
      <div className={classes["meal-item-left-section"]}>
        <img
          className={classes["meal-item-img"]}
          src={props.item.imageUrl}
          alt={props.item.imageUrl}
        ></img>
      </div>

      <div className={classes["meal-item-center-section"]}>
        <h6 className={classes["item-name"]}>{props.item.name}</h6>
        <h6 className={classes["item-decription"]}>{props.item.description}</h6>
        <h6 className={classes["item-price"]}>₹ {props.item.price}</h6>
      </div>

      <form
        className={classes["meal-item-right-section"]}
        onSubmit={addItemToCart}
      >
        <div className={classes["item-quantity"]}>
          <label htmlFor="item-quantity">Quantity</label>
          <input
            ref={qtyRef}
            name="item-quantity"
            type="number"
            step={1}
            placeholder={0}
            min={0}
            defaultValue={0}
          ></input>
        </div>
        <input type="submit" className={classes["add-item-btn"]} value="ADD" />
      </form>
    </div>
  );
};
export default MealItem;
