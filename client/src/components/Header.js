import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartState } from "../context/Context";
import jwt_decode from "jwt-decode";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const {
    state: { cart, userInfo },
    dispatch,
    productDispatch,
  } = CartState();

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shipping address");
    navigate("/");
  };
  useEffect(() => {
    if (userInfo) {
  // decode isAdmin,name from token and save them in isAdmin, name variables
      setIsAdmin(jwt_decode(userInfo.token).isAdmin);
      setName(jwt_decode(userInfo.token).name);
    } else {
      setIsAdmin(false);
      setName("");
    }
  }, [userInfo]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-1 ">
      <div className="container-fluid">
        <span className="navbar-brand ">Nile Store</span>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-auto">
              <NavLink className="nav-link " aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            {userInfo ? (
              <li className="nav-item dropdown mx-5">
                <Link
                  className="nav-link active dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {name}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orderhistory">
                      Order History
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/my-products">
                        My Products
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <NavLink className="nav-link mx-5" to="/signin">
                Sign In
              </NavLink>
            )}
            <li className="nav-item dropdown mx-5">
              <NavLink
                className="nav-link dropdown-toggle bg-success "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-cart-arrow-down"></i>
                <span className="badge text-bg-danger ms-1">
                  <b>{cart.reduce((acc, curr) => acc + Number(curr.qty), 0)}</b>
                </span>
              </NavLink>
              <ul className="dropdown-menu wide">
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem " key={prod._id}>
                        <img
                          src={prod.image}
                          className="cartitemImg"
                          alt={prod.name}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>{prod.price} ₪</span>
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
              </ul>
            </li>
          </ul>
          <form className="d-flex " role="search">
            <input
              className="form-control wide me-auto"
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
            <button className="btn btn-outline-success  " type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
