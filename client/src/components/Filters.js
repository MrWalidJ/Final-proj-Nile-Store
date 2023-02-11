import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CartState } from "../context/Context";

const Filters = () => {
  const {
    state: { userInfo },
    productState: { byStock, sort },
    productDispatch,
  } = CartState();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (userInfo) {
      // decode isAdmin from token and save it in isAdmin variable
      setIsAdmin(jwt_decode(userInfo.token).isAdmin);
      setIsSeller(jwt_decode(userInfo.token).isSeller);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);

  // console.log(byStock, byFastdelivery, sort, byRating);
  return (
    <div className="w-100 bg-dark text-light mx-1 d-flex my-2  ">
      <h5 className="mx-3 my-auto ">
        <b>Filter Products : </b>
      </h5>
      <span className="form-check my-auto mx-3">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Ascending Price
        </label>
      </span>
      <span className="form-check my-auto mx-3">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Descending Price
        </label>
      </span>
      <span className="form-check my-auto mx-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Include Out of Stock
        </label>
      </span>
      <span className="form-check my-auto mx-3">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          name="category"
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            productDispatch({
              type: "FILTER_BY_CATEGORY",
              payload: e.target.value,
            });
          }}
        >
          <option value="DEFAULT" disabled>
            Choose Category
          </option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
        </select>
      </span>

      <span className=" my-3 mx-3">
        <button
          className="btn btn-secondary"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear filters
        </button>
        {(isAdmin || isSeller) && (
          <button
            className="btn btn-success my-1 ms-5 rounded-pill "
            onClick={() => {
              navigate("/add-product");
            }}
          >
            <b>
              <i className="fa-solid fa-plus"></i> Add Product
            </b>
          </button>
        )}
      </span>
    </div>
  );
};

export default Filters;
