import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { CartState } from "../context/Context";
import { fetchReducer } from "../context/Reducer";
import Filters from "./Filters";

import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const {
    state: { userInfo },
  } = CartState();
  // const [filt, setFilt] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const api = process.env.REACT_APP_API || "";

  const [{ loading, error, products }, fetchDispatch] = useReducer(
    fetchReducer,
    {
      loading: true,
      error: "",
      products: [],
    }
  );
  const {
    productState: { sort, byStock, byRating, searchQuery }, // destructuring products from the
  } = CartState();

  useEffect(() => {
     if (userInfo) {
      setIsAdmin(userInfo.isAdmin);
    } else {
      setIsAdmin(false);
    }
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
  }, [userInfo, api]);

  const transformProducts = () => {
    let sortedProducts = products;
    //console.log("sorted:", sortedProducts);
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
    <>
      {isAdmin && (
        <button
          className="btn btn-success my-1 ms-3 "
          onClick={() => {
            navigate("/add-product");
          }}
        >
          <b>
            <i className="fa-solid fa-plus"></i> Add Product
          </b>
        </button>
      )}

      <div className="d-flex">
        {/* {filt ?
            (<Filters />):(null)} */}

        <Filters />

        <div className="row w-75 ">
          {transformProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
