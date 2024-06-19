import CartItem from "../Cart/cart-item";
import classes from "../Cart/cart.module.css";
import BackdropContext from "../../store/backdrop-context";
import { useContext } from "react";
import CartItemContext from "../../store/cart-items-context";
import cartoonImg from "../../assets/Untitled-design.png";
const Cart = (props) => {
  const backdropCtx = useContext(BackdropContext);
  const cartItemContext = useContext(CartItemContext);

  // const cartItemList = Object.values(cartItemContext.cartItemList);
  console.log("re-rendered");
  var totalPrice = 0;

  Object.values(cartItemContext.cartItemList)
    .map((cartItem) => {
      return cartItem.price * cartItem.qty;
    })
    .forEach((itemTotalPrice) => {
      totalPrice += itemTotalPrice;
    });

  return (
    <div className={classes.card}>
      <div className={classes["cart-header"]}>
        <h1>React Mealz</h1>
        <button
          className={classes["close-cart-btn"]}
          onClick={backdropCtx.onHideCart}
        >
          X
        </button>
      </div>
      {Object.values(cartItemContext.cartItemList).length > 0 && (
        <h3>Items on your platter</h3>
      )}
      {Object.values(cartItemContext.cartItemList).length !== 0 ? (
        <table className={classes["table"]}>
          <thead>
            <tr className={classes["table-row"]}>
              <th className={classes["table-header"]}>Item Name</th>
              <th className={classes["table-header"]}>Qty</th>
              <th className={classes["table-header"]}>Rate</th>
              <th className={classes["table-header"]}>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cartItemContext.cartItemList).map((foodItem) => {
              return (
                <CartItem
                  key={foodItem.id}
                  id={foodItem.id}
                  name={foodItem.name}
                  qty={foodItem.qty}
                  price={foodItem.price}
                ></CartItem>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={classes["error-section"]}>
          <img className={classes["error-img"]} src={cartoonImg} />
          <h5 className={classes["error-tag"]}>
            Oops! seems like nothing was added to the cart
          </h5>
        </div>
      )}
      {Object.values(cartItemContext.cartItemList).length > 0 && (
        <div className={classes["cart-footer"]}>
          <h6>GRAND TOTAL : </h6>
          <h6>{totalPrice}</h6>
          <button
            className={classes["checkout-btn"]}
            onClick={backdropCtx.onShowForm}
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
