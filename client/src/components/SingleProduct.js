import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart }, // can be state so we use state.cart 
    dispatch,
  } = CartState();

  return (
    <div className="card col-4 m-3" style={{ width: "18rem" }}>
      <img src={prod.image} className="card-img-top" alt={prod.name} />
      <div className="card-body">
        <h5 className="card-title">{prod.name}</h5>
        <h5 className="card-text">{prod.price.split(".")[0]} NIS </h5>
        {prod.fastdelivery ? (
          <div>Fast Delivery</div>
        ) : (
          <div>4 Days Delivery</div>
        )}
        <Rating rating={prod.ratings} />
        {cart.some((p) => p.id === prod.id) ? (
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

      {/* {cart.includes(prod) ? (
        <button
          className="btn btn-primary w-100 my-2"
          onClick={() => {
            setCart(cart.filter((c) => c.id !== prod.id));
          }}
        >
          Remove from cart
        </button>
      ) : (
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            setCart([...cart, prod]); // Add product to cart
          }}
        >
          Add to Cart
        </button>
      )} */}
    </div>
  );
};

export default SingleProduct;
