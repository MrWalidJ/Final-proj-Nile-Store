import { CartState } from "../context/Context";
import Filters from "./Filters";

import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery }, // destructuring products from the
  } = CartState();
 console.log("by stock:" , byStock);
  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      ); // we used the sort function
    }
    if (!byStock ) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
   
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastdelivery);
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

  return (
    <div className="d-flex my-3"> 
      <Filters />
      <div className="row w-75 mt-3">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
