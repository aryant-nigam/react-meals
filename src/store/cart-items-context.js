import { useState } from "react";
import React from "react";

const CartItemContext = React.createContext({
  cartItemList: {},
  onAddCartItem: (item, qty) => {},
  onUpdateCartItem: (id, newQty) => {},
  onClearCartItems: () => {},
});

export const CartItemContextProvider = (props) => {
  const [cartItemList, setCartItemList] = useState({});

  const addToCartListHandler = (item, qty) => {
    if (item.id in cartItemList) {
      const prevQty = cartItemList[item.id].qty;
      const cartItem = {
        [item.id]: { ...item, qty: parseInt(qty) + parseInt(prevQty) },
      };
      setCartItemList((prevCartItems) => {
        return { ...prevCartItems, ...cartItem };
      });
    } else {
      const cartItem = { [item.id]: { ...item, qty: qty } };
      setCartItemList((prevCartItems) => {
        return { ...prevCartItems, ...cartItem };
      });
    }
  };

  const updateCartItemHandler = (id, newQty) => {
    console.log("updating cart items", id, newQty);
    if (newQty !== 0) {
      let updatedCartItemList = { ...cartItemList };
      updatedCartItemList[id].qty = newQty;
      setCartItemList(updatedCartItemList);
    } else {
      let updatedCartItemList = { ...cartItemList };
      delete updatedCartItemList[id];
      setCartItemList(updatedCartItemList);
    }
  };

  const clearCartListHandler = () => {
    setCartItemList([]);
  };

  return (
    <CartItemContext.Provider
      value={{
        cartItemList: cartItemList,
        onAddCartItem: addToCartListHandler,
        onUpdateCartItem: updateCartItemHandler,
        onClearCartItems: clearCartListHandler,
      }}
    >
      {props.children}
    </CartItemContext.Provider>
  );
};

export default CartItemContext;

/*
cartItemList = {
    7:{
        id:7
        name: "Palak Paneer",
        price: 11.49,
        description: "Creamy spinach curry with cubes of paneer (Indian cottage cheese) and aromatic spices.",
        imageUrl: "./images/palak-paneer.jpg",
        qty:2
    }
    6:{
        id: 6,
        name: "Chhole Bhature",
        price: 9.49,
        description:
        "Spicy chickpea curry served with deep-fried bread (bhature) made from maida flour.",
        imageUrl: "./images/chhole-bhature.jpg",
    }
}
 */
