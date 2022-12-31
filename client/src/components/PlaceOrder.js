import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartState } from "../context/Context";
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, order: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    state: { userInfo },
  } = CartState();

  const { id: orderId } = useParams();
  const api = process.env.REACT_APP_API || " ";

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
         const { data } = await axios.get(`${api}orders/${orderId}`, {
          headers: { Authorization: `${userInfo.token}` },
          // Because this request has to be an authorized request.
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    if (!userInfo) {
      navigate("/signin");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate, api]);

  return loading ? (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : error ? (
    <div className="d-flex justify-content-center mt-5">
      <div className="alert alert-danger" role="alert">
        Network Error
      </div>
    </div>
  ) : (
    <div>
      <h1 className="m-3">Order {orderId}</h1>
      <div className="row ">
        <div className="col-md-7 mx-3">
          <div className="card mb-3 ">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <b> Name: </b> {order.shippingAddress.fullName} <br />
                <b> Address: </b> {order.shippingAddress.address},
                {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.postalcode},
                {order.shippingAddress.country}
              </p>
             
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <p className="card-text">
                <b> Method: </b> PayPal <br />
              </p>
            
            </div>
          </div>

          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">Items</h5>
              <ul className="list-group ">
                {order.orderItems.map((item) => (
                  <li className="list-group-item" key={item._id}>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          className=" placeOrder_img"
                          alt={item.name}
                        />
                      </div>
                      <Link to={`/product/${item._id}`} className="col-md-3">
                        {item.name}
                      </Link>
                      <div className="col-md-3">{item.qty} </div>
                      <div className="col-md-3">{item.qty * item.price} ₪ </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title"> Order Summary</h5>
              <ul className="list-group w-100">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Items: </div>
                    <div className="col">{order.itemsPrice.toFixed(2)} ₪ </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Shipping: </div>
                    <div className="col">
                      {order.shippingPrice.toFixed(2)} ₪{" "}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Tax: </div>
                    <div className="col">{order.taxPrice.toFixed(2)} ₪ </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      <b>Order Total:</b>
                    </div>
                    <div className="col">
                      <b>{order.totalPrice.toFixed(2)} ₪</b>
                    </div>
                  </div>
                </li>
                <li className="list-group-item text-center "></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
