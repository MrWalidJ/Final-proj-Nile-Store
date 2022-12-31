import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartState } from "../context/Context";
import { errorMsg } from "../Services/feedbackService";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    state,
    state: { cart, shippingAddress, userInfo },
    dispatch,
  } = CartState();
  const api = process.env.REACT_APP_API || " ";

  const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  state.itemsPrice = round2(
    cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  );
  state.shippingPrice = state.itemsPrice < 100 ? 0 : round2(10);
  state.taxPrice = round2(0.15 * state.itemsPrice);
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post(`${api}orders`, {
        orderItems: state.cart,
        shippingAddress: state.shippingAddress,
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      },
      {
        headers:{
            Authorization:`${userInfo.token}`,
        }
      });
      console.log(data);
      console.log("token is:",userInfo.token );
      console.log("1st item id is:", data.order.orderItems[0]._id);
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cart");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      errorMsg("Something went wrong !");
    }
  };

  return (
    <div>
      <h1 className="m-3"> Preview Order</h1>
      <div className="row ">
        <div className="col-md-7 mx-3">
          <div className="card mb-3 ">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <b> Name: </b> {shippingAddress.fullName} <br />
                <b> Address: </b> {shippingAddress.address},
                {shippingAddress.city} , {shippingAddress.postalcode},
                {shippingAddress.country}
              </p>
              <Link to="/shipping">Edit</Link>
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
                {cart.map((prod) => (
                  <li className="list-group-item" key={prod._id}>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <img
                          src={prod.image}
                          className=" placeOrder_img"
                          alt={prod.name}
                        />
                      </div>

                      <Link to={`/product/${prod._id}`} className="col-md-3">
                        {prod.name}
                      </Link>
                      <div className="col-md-3">{prod.qty} </div>
                      <div className="col-md-3">{prod.qty * prod.price} ₪ </div>
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
                    <div className="col">{state.itemsPrice.toFixed(2)} ₪ </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Shipping: </div>
                    <div className="col">
                      {state.shippingPrice.toFixed(2)} ₪{" "}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Tax: </div>
                    <div className="col">{state.taxPrice.toFixed(2)} ₪ </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      <b>Order Total:</b>
                    </div>
                    <div className="col">
                      <b>{state.totalPrice.toFixed(2)} ₪</b>
                    </div>
                  </div>
                </li>
                <li className="list-group-item text-center ">
                  <button
                    type="button"
                    className="btn btn-success w-75"
                    onClick={placeOrderHandler}
                    disabled={cart.length === 0}
                  >
                    <b>Place Order</b>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
