import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  //const [rate, setRate] = useState(1);
  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = CartState();

 // console.log(byStock, byFastdelivery, sort, byRating);
  return (
    <div className="w-25 bg-dark text-light ms-3 me-5">
      <h3 className="m-3 text-center">Filter Products</h3>
      <div className="form-check my-2 mx-3">
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
          Ascending
        </label>
      </div>
      <div className="form-check my-2 mx-3">
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
          Descending
        </label>
      </div>
      <div className="form-check ny-2 mx-3">
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
      </div>
      <div className="form-check my-2 mx-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Fast Delivery Only
        </label>
      </div>
      <span className="d-flex">
        <label className="pe-10 mx-3"> Rating : </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1, // just like setRating[i+1]
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <div className="text-center my-3 mx-3">
        <button
          className="btn btn-secondary w-50"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
