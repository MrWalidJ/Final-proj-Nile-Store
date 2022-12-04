import { faker } from "@faker-js/faker";
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";
export const Cart = createContext();

faker.seed(99);
// create array of 20
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastdelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));
  //console.log(productsArr);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  }); // go to reducer.js to create cartReducer

  // create another reducer for the filter
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false , // so it doesn't display those that are out of stock
    byFastdelivery:false, // display fast deliery only
    byRating: 0,
    searchQuery:"",
  })

  return <Cart.Provider value={{ state, dispatch , productState,productDispatch }}>{children}</Cart.Provider>; // children means whatever it's going to wrap around
};

export default Context;

export const CartState = () => {
  return useContext(Cart); // then go to home to import it
};
