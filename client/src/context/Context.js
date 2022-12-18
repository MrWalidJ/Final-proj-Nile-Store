import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer, fetchReducer } from "./Reducer";
export const Cart = createContext();


const Context = ({ children }) => {
 
  const [state, dispatch] = useReducer(cartReducer, {
    cart:localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')): [], // initially empty
  }); // go to reducer.js to create cartReducer

  // create another reducer for the filter
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false, // so it doesn't display those that are out of stock
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  ); // children means whatever it's going to wrap around
}; // This is to wrap all the react app. children will come from index.js

export default Context;

export const CartState = () => {
  return useContext(Cart); // then go to home to import it
};
