import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const api = process.env.REACT_APP_API || "";
const prodfetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};
const ProdPage = () => {
  const { id } = useParams();
  const {
    state: { cart }, // can be state so we use state.cart
    dispatch,
  } = CartState();

  const [{ loading, error, product }, fetchDispatch] = useReducer(
    prodfetchReducer,
    {
      loading: true,
      error: "",
      product: [],
    }
  );

  useEffect(() => {
    const getProduct = async () => {
      fetchDispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${api}products/${id}`);
        fetchDispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        fetchDispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    getProduct();
  }, [id]);
  return loading ? (
    <div className ="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : error ? (
    <div class="d-flex justify-content-center mt-5">
      <div class="alert alert-danger" role="alert">
        Network Error
      </div>
    </div>
  ) : (
    <div className="container-fluid mt-3 w-100 ">
      <div className="row">
        <div className=" card col-md-4 ms-5">
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </div>

        <ul className="list-group col-md-3 mx-5 ">
          <li className="list-group-item">
            <h2>{product.name}</h2>
          </li>
          <li className="list-group-item">
            <Rating rating={product.ratings} />
          </li>
          <li className="list-group-item">
            <h5>Price : ₪ {product.price}</h5>
          </li>
          <li className="list-group-item">
            <h5>Description :</h5>
            <p>{product.description}</p>
          </li>
        </ul>

        <ul className="list-group col-md-2 ">
          <li className="list-group-item">
            <div className="row">
              <div className="col"> Price:</div>
              <div className="col"> ₪ {product.price}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col"> Status:</div>
              <div className="col">
                {product.inStock > 0 ? (
                  <span className="badge text-bg-success"> In Stock</span>
                ) : (
                  <span className="badge text-bg-danger"> Unavailable</span>
                )}
              </div>
            </div>
          </li>
          {product.inStock > 0 && (
            <li className="list-group-item ">
              {cart.some((p) => p._id === product._id) ? (
                // some() helps us know if this particular thing exists in the array or not
                // if exists show "REMOVE FROM CART" button , otherwise sow"add to cart" button
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    });
                  }}
                  disabled={!product.inStock}
                >
                  {!product.inStock ? "Out of Stock" : "Add to Cart"}
                </button>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProdPage;
