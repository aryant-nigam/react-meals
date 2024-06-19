import React, { useContext } from "react";
import dineImg from "../../assets/dine1.jpg";
import classes from "./header.module.css";
import CartButton from "../UI/cart-button";
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Mealz</h1>
        <CartButton></CartButton>
      </header>
      <div className={classes["img-container"]}>
        <img
          src={dineImg}
          alt="A plate full of delicious meals"
          className={classes["main-img"]}
        />
      </div>
    </>
  );
};
export default Header;
