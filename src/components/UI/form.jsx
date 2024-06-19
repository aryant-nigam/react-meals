import { useContext, useState } from "react";
import classes from "./form.module.css";
import Input from "./input";
import useInput from "../../Hooks/use-input";
import BackdropContext from "../../store/backdrop-context";
import CartItemContext from "../../store/cart-items-context";

const Validator = {
  isNameValid: (name) => name.trim() !== "" && /^[a-zA-Z]/.test(name),

  isPhnNumValid: (phnNum) =>
    phnNum.trim() !== "" && phnNum.length === 10 && /^[0-9]{10}$/.test(phnNum),

  isAddressValid: (address) =>
    address.trim() !== "" && /^[a-zA-Z0-9]/.test(address),

  isCouponValid: (validCouponsList, couponCode) =>
    validCouponsList.includes(couponCode) || couponCode.trim() === "",
};

const Form = () => {
  const backdropCtx = useContext(BackdropContext);
  const cartItemCtx = useContext(CartItemContext);

  const validCouponsList = ["aaa", "bbb"];

  const {
    enteredValue: enteredName,
    hasError: nameHasError,
    isValid: isNameValid,
    updateValueOnKeystroke: updateNameOnKeystroke,
    updateIsTouched: updateIsNameTouched,
    resetEnteredValue: resetEnteredName,
    resetIsTouched: resetIsNameTouched,
  } = useInput(Validator.isNameValid);

  const {
    enteredValue: enteredPhnNo,
    hasError: phnNoHasError,
    isValid: isPhnNoValid,
    updateValueOnKeystroke: updatePhnNoOnKeystroke,
    updateIsTouched: updateIsPhnNoTouched,
    resetEnteredValue: resetEnteredPhnNo,
    resetIsTouched: resetIsPhnNoTouched,
  } = useInput(Validator.isPhnNumValid);

  const {
    enteredValue: enteredAddress,
    hasError: addressHasError,
    isValid: isAddressValid,
    updateValueOnKeystroke: updateAddressOnKeystroke,
    updateIsTouched: updateIsAddressTouched,
    resetEnteredValue: resetEnteredAddress,
    resetIsTouched: resetIsAddressTouched,
  } = useInput(Validator.isAddressValid);

  const {
    enteredValue: enteredCoupon,
    hasError: couponHasError,
    isValid: isCouponValid,
    updateValueOnKeystroke: updateCouponOnKeystroke,
    updateIsTouched: updateIsCouponTouched,
    resetEnteredValue: resetEnteredCoupon,
    resetIsTouched: resetIsCouponTouched,
  } = useInput(Validator.isCouponValid.bind(this, validCouponsList), false);

  const [modeOfPayment, setModeOfPayment] = useState("Online payment");

  const isFormValid =
    isNameValid && isPhnNoValid && isAddressValid && isCouponValid;

  const placeOrder = async (orderDetails) => {
    console.log(orderDetails);
    try {
      const response = await fetch(
        "https://react-mealz-f3f32-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ ...orderDetails, date: new Date() }),
          header: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      cartItemCtx.onClearCartItems();
      backdropCtx.onHideForm();
      backdropCtx.onHideCart();
      backdropCtx.onShowSnackbar("Order placed sucessfully 😊");
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    resetEnteredName();
    resetEnteredPhnNo();
    resetEnteredAddress();
    resetEnteredCoupon();
    resetIsNameTouched();
    resetIsPhnNoTouched();
    resetIsAddressTouched();
    resetIsCouponTouched();

    const createUserItemCheckoutList = () => {
      const cartItems = Object.values(cartItemCtx.cartItemList);
      return cartItems.map((item) => {
        return { name: item.name, qty: item.qty, price: item.price };
      });
    };

    placeOrder({
      name: enteredName,
      phnNum: enteredPhnNo,
      address: enteredAddress,
      couponCode: enteredCoupon,
      modeOfPayment: modeOfPayment,
      items: createUserItemCheckoutList(),
    });
  };

  const modeOfPaymentChangeHandler = (event) => {
    setModeOfPayment(event.target.value);
  };

  return (
    <form className={classes["form"]} onSubmit={formSubmitHandler}>
      <h1 className={classes["form-heading"]}>
        You're 1 step away from a DELICIOUS delight !
      </h1>
      <Input
        type="text"
        label="Name *"
        isRequired={true}
        enteredValue={enteredName}
        hasError={nameHasError}
        updateValueOnKeystroke={updateNameOnKeystroke}
        updateIsTouched={updateIsNameTouched}
      ></Input>
      <Input
        type="text"
        label="Phone number *"
        isRequired={true}
        hasError={phnNoHasError}
        enteredValue={enteredPhnNo}
        updateValueOnKeystroke={updatePhnNoOnKeystroke}
        updateIsTouched={updateIsPhnNoTouched}
      ></Input>
      <Input
        type="text"
        label="Address *"
        isRequired={true}
        hasError={addressHasError}
        enteredValue={enteredAddress}
        updateValueOnKeystroke={updateAddressOnKeystroke}
        updateIsTouched={updateIsAddressTouched}
      ></Input>
      <Input
        type="text"
        label="Coupon code "
        isRequired={false}
        hasError={couponHasError}
        enteredValue={enteredCoupon}
        updateValueOnKeystroke={updateCouponOnKeystroke}
        updateIsTouched={updateIsCouponTouched}
      ></Input>

      <div className={`${classes["fields"]} ${classes["radio-fields"]}`}>
        <label htmlFor="" className={classes["label"]}>
          Mode of payment *
        </label>

        <div className={classes["radio-group-box"]}>
          <div className="choices">
            <input
              type="radio"
              id="age2"
              name="MOP"
              value="Online payment"
              defaultChecked={true}
              onChange={modeOfPaymentChangeHandler}
            />
            <label htmlFor="age2">Online payment</label>
          </div>
          <div className="choices">
            <input
              type="radio"
              id="age1"
              name="MOP"
              value="Pay on delivery"
              onChange={modeOfPaymentChangeHandler}
            />
            <label htmlFor="age1">Pay on delivery</label>
          </div>
        </div>
      </div>

      <div className={classes["form-actions"]}>
        <input
          type="button"
          className={classes["cancel-btn"]}
          value="Go Back"
          onClick={backdropCtx.onHideForm}
        />
        <input
          type="submit"
          className={`${classes["submit-btn"]} ${
            !isFormValid && classes["disabled-btn"]
          }`}
          value="Place Order"
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default Form;
