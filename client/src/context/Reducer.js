// Create reducer for add and remove from cart
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //console.log(state);
      //console.log({ ...state, cart: [...state.cart, { ...action.payload,qty:1 }] });
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "REMOVE_FROM_CART":
      //console.log(state.cart);
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ), // c.qty is the current value
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id === ""),
      };

    default:
      return state;
  }
};

// create the productreducer for the filtering
export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload }; // sort variable added
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock }; // sort variable added
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery }; // sort variable added
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload }; // sort variable added
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload }; // sort variable added
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      }; // now go to Filter.js

    default:
      return state;
  }
};
