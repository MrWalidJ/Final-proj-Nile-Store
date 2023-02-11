import axios from "axios";
import { useEffect, useReducer } from "react";
import { CartState } from "../context/Context";
import { fetchReducer } from "../context/Reducer";
import { errorMsg, successMsg } from "../Services/feedbackService";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

function Home() {
  // isAdmin variable holds isAdmin value that is saved in the token
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
    productState: { sort, byStock, searchQuery, catQuery },
    state: { userInfo },
  } = CartState();
  const getProducts = async () => {
    fetchDispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(`${api}products`);
      fetchDispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      fetchDispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      ); // we used the sort function
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    if (catQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.category.includes(catQuery)
      );
    }
    return sortedProducts;
  };

  const deleteProd = async (id) =>
    await axios.delete(`${api}products/${id}`, {
      headers: { Authorization: `${userInfo.token}` },
    });

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`))
      deleteProd(product._id)
        .then(() => {
          getProducts();
          successMsg("Card deleted successfully");
        })
        .catch((err) => errorMsg(err));
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
    <div>
      <Filters />

      <div className="row w-100 mx-3 my-3">
        {transformProducts().map((prod) => (
          <SingleProduct
            prod={prod}
            handleDelete={handleDelete}
            key={prod._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
