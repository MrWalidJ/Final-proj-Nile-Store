import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart }, // can be state so we use state.cart
    dispatch,
  } = CartState();

  return (
    <div className="card col-3 m-3" style={{ width: "18rem" }}>
      <Link to={`/product/${prod._id}`}>
       
        <img src={prod.image} className="card-img-top" alt={prod.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${prod._id}`}>
         
          <h5 className="card-title">{prod.name}</h5>
        </Link>
        <h5 className="card-text">{prod.price} NIS </h5>

        <Rating rating={prod.ratings} />
        {cart.some((p) => p._id === prod._id) ? (
          // some() helps us know if this particular thing exists in the array or not
          // if exists show "REMOVE FROM CART" button , otherwise sow"add to cart" button
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
      </div>
    </div>
  );
};

export default SingleProduct;
