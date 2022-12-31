import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../context/Context";
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const OrderHistory = () => {
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API || " ";
  const {
    state: { userInfo },
  } = CartState();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${api}orders/my-orders`, {
          headers: { Authorization: `${userInfo.token}` },
          // Because this request has to be an authorized request.
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, [api, userInfo]);

  return (
    <div>
      <title>Order History</title>

      <h1 className="m-3"> Order History </h1>
      {loading ? (
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
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
