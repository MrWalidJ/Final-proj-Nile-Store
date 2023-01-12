import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
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
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import MyProducts from "./components/MyProducts";
import Contact from "./components/Contact";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
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
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resetPassword/:id/:token" element={<ResetPassword/>} />
          </Routes>
        </div>
      </main>
      <footer className="text-center mb-2">
        <div className="alert alert-secondary mt-4" role="alert">
          <b>
            Nile Store 2023
            <br />
            All rights reserved &copy; Walid Jamjoum
          </b>
          <br />
          <h4>
            <i className="fa-brands fa-linkedin me-1"></i>
            <i className="fa-brands fa-github-square me-1"></i>
            <i className="fa-brands fa-facebook-square me-1"></i>
            <i className="fa-brands fa-instagram-square"></i>
          </h4>
          <div>
            <Link to="/contact-us" className="me-3"> Contact us</Link>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
