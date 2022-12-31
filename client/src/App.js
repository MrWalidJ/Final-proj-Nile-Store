import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
//import Prods from "./components/prods";
import CartPage from "./components/Cart";
import ProdPage from "./components/ProdPage";
import Signin from "./components/Signin";
import Register from "./components/Register";
import ShippingPage from "./components/shippingPage";
import PreviewOrder from "./components/PreviewOrder";
import PlaceOrder from "./components/PlaceOrder";
import OrderHistory from "./components/OrderHistory";
//import Carousel from "./components/Carousel";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <main>
        <div className="mt-1">
          {/* <Carousel /> */}
          <Routes>
            {/* <Route path="/" element={<Prods />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProdPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orderpreview" element={<PreviewOrder />} />
            <Route path="/order/:id" element={<PlaceOrder />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center">All rights reserved © Walid Jamjoum</footer>
    </Router>
  );
}

export default App;
