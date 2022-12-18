import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
//import Prods from "./components/prods";
import CartPage from "./components/Cart";
import ProdPage from "./components/ProdPage";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* <Route path="/" element={<Prods />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProdPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
