export const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

// Create reducer for add and remove from cart
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const cartItems = [...state.cart, { ...action.payload, qty: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: cartItems,
      };

    case "REMOVE_FROM_CART": {
      const cartItems = state.cart.filter((c) => c._id !== action.payload._id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: cartItems,
      };
    }
    case "CHANGE_CART_QTY": {
      const cartItems = state.cart.filter((c) =>
        c._id === action.payload._id ? (c.qty = action.payload.qty) : c.qty
      ); // c.qty is the current value
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: cartItems,
      };
    }

    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cart: [],
      };

    case "USER_SIGNIN":
      //console.log({ ...state, userInfo: action.payload });
      return {
        ...state,
        userInfo: action.payload,
      };

    case "USER_SIGNOUT":
      localStorage.removeItem("cartItems");
      return {
        ...state,
        userInfo: null,
        cart: [],
        shippingAddress: {}, // to reset both shipping and cart in signout
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
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
