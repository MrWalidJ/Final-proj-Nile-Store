import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cart } from "../context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useContext(Cart);

  return (
    <div className="container-fluid ms-1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <span className="navbar-brand me-5">e-Shopping</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  HomePage
                </NavLink>
              </li>
            </ul>
            <form className="d-flex " role="search">
              <input
                className="form-control me-2 wide"
                type="search"
                placeholder="Search a product"
                aria-label="Search"
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
              />
              <button className="btn btn-outline-success " type="submit">
                Search
              </button>

              <div className="nav-item dropdown navbar-nav mb-2 mb-lg-0 space">
                <NavLink
                  className="nav-link dropdown-toggle bg-success me-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-cart-arrow-down"></i>
                  <span className="badge text-bg-secondary">{cart.length}</span>
                </NavLink>
                <ul className="dropdown-menu">
                  {cart.length > 0 ? (
                    <>
                      {cart.map((prod) => (
                        <span className="cartitem" key={prod._id}>
                          <img
                            src={prod.image}
                            className="cartitemImg"
                            alt={prod.name}
                          />
                          <div className="cartItemDetail">
                            <span>{prod.name}</span>
                            <span>{prod.price} NIS</span>
                          </div>
                          <i
                            className="fa-solid fa-trash text-danger"
                            style={{ fontSize: "18px", cursor: "pointer" }}
                            onClick={
                              () =>
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: prod,
                                })
                              //when clicked it will call dispatch with the action
                              // "REMOVE_FROM_CART" and it will supply the product
                            }
                          ></i>
                        </span>
                      ))}
                      <div className="text-center">
                        <Link
                          to="/cart"
                          className="btn btn-primary"
                          style={{ width: "95%" }}
                        >
                          Go to Cart
                        </Link>
                      </div>
                    </>
                  ) : (
                    <span style={{ padding: 10 }}>Cart is empty</span>
                  )}
                  <li></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
