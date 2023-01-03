import { errorMsg, successMsg } from "../Services/feedbackService";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartState } from "../context/Context";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const {
    state: { userInfo },
  } = CartState();
  const api = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const getMyProd = async () => {
    await axios
      .get(`${api}products/my-products`, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      })
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    getMyProd();
  }, []);
  const deleteProd = async (id) =>
    await axios.delete(`${api}products/${id}`, {
      headers: { Authorization: `${userInfo.token}` },
    });

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`))
      deleteProd(product._id)
        .then(() => {
          getMyProd();
          successMsg("Card deleted successfully");
        })
        .catch((err) => errorMsg(err));
  };
  return (
    <>
      <h3 className="display-5 text-center">My Products</h3>

      <div className="row">
        {products.length ? (
          products.map((product) => (
            <div
              className="card col-md-3 m-3 text-center"
              key={product._id}
              style={{ width: "18rem" }}
            >
              <img
                src={product.image}
                className="card-img-top"
                alt="card img"
              />
              <div className="card-body">
                <h3 className="text-dark">{product.name} </h3>
                <hr />
                <h5 className="card-title">{product.price}</h5>
                <hr />
                <p className="card-text">{product.description}</p>
                <hr />

                <Link
                  to={`/edit-product/${product._id}`}
                  className="btn btn-warning mx-1"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button
                  onClick={() => handleDelete(product)}
                  className="btn btn-danger mx-1"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center my-4">No products </h4>
        )}
      </div>
    </>
  );
};

export default MyProducts;
