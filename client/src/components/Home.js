import axios from "axios";
import { useEffect, useReducer } from "react";
import { CartState } from "../context/Context";
import { fetchReducer } from "../context/Reducer";
import Filters from "./Filters";

import SingleProduct from "./SingleProduct";
const api = process.env.REACT_APP_API || "";

const Home = () => {
  // const [filt, setFilt] = useState(true);
  const [{ loading, error, products }, fetchDispatch] = useReducer(
    fetchReducer,
    {
      loading: true,
      error: "",
      products: [],
    }
  );

  useEffect(() => {
    const getProducts = async () => {
      fetchDispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${api}products`);
        fetchDispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        fetchDispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    getProducts();
  }, []);
  const {
    productState: { sort, byStock, byRating, searchQuery }, // destructuring products from the
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;
    console.log("sorted:", sortedProducts);
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      ); // we used the sort function
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };

  return loading ? (
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
    <div className="d-flex my-3">
      {/* {filt ?
      (<Filters />):(null)} */}
      <Filters />
      <div className="row w-75 mt-3">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
