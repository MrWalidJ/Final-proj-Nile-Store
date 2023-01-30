import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { errorMsg } from "../Services/feedbackService";
import jwt_decode from "jwt-decode";

const SingleProduct = ({ prod, handleDelete }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const api = process.env.REACT_APP_API || " ";
  const [isFav, setIsFav] = useState(false);

  const {
    state: { cart, userInfo },
    dispatch,
  } = CartState();

  let body = {
    prodId: prod._id,
    name: prod.name,
    price: prod.price,
    category: prod.category,
    image: prod.image,
  };
  useEffect(() => {
    if (userInfo) {
      // decode isAdmin,name from token and save them in isAdmin, name variables
      setIsAdmin(jwt_decode(userInfo.token).isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);
  const addFavHandler = async () => {
    try {
      await axios.post(`${api}favs`, body, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
    } catch (err) {
      alert("Item already added !!");
    }
  };

  const deleteFavItem = async (id) =>
    await axios.delete(`${api}favs/${id}`, {
      headers: { Authorization: `${userInfo.token}` },
    });

  const handleDeletefav = (fav) => {
    deleteFavItem(fav._id)
      .then(() => {})
      .catch((err) => errorMsg(err));
  };

  return (
    <div className="card col-2 m-3" style={{ width: "14.5rem" }}>
      <Link to={`/product/${prod._id}`}>
        <img src={prod.image} className="card-img-top" alt={prod.name} />
      </Link>

      <div className="card-body">
        <Link to={`/product/${prod._id}`}>
          <p className="card-text fw-bold">{prod.name}</p>
        </Link>
        <hr />
        <h5 className="card-text text-center">{prod.price} ₪ </h5>
        <hr />

        {cart.some((p) => p._id === prod._id) ? (
          //some() helps us know if this particular thing exists in the array or not
          //if exists show "REMOVE FROM CART" button , otherwise show "add to cart" button
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              });
            }}
          >
            Remove from cart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              });
            }}
            disabled={!prod.inStock}
          >
            {!prod.inStock ? "Out of Stock" : "Add to Cart"}
          </button>
        )}

        {userInfo &&
          (isFav ? (
            <div className="mt-2">
              <i
                className="fa-solid fa-star text-warning"
                onClick={() => {
                  handleDeletefav(prod);
                  setIsFav(false);
                }}
                style={{ cursor: "pointer" }}
              ></i>
              <span className="text-success fw-bold fst-italic">
                Added to favorites
              </span>
            </div>
          ) : (
            <div className="mt-2">
              <i
                className="fa-regular fa-star"
                onClick={() => {
                  addFavHandler();
                  setIsFav(true);
                }}
                style={{ cursor: "pointer" }}
              ></i>
              <span className="text-danger"> Add to favorites</span>
            </div>
          ))}
        {isAdmin && (
          <div className="text-center my-1">
            <Link
              to={`/edit-product/${prod._id}`}
              className="btn btn-warning mx-3"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button
              onClick={() => handleDelete(prod)}
              className="btn btn-danger mx-1"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
