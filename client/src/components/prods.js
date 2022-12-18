import React, { useEffect, useState } from "react";
import axios from "axios";

const api = process.env.REACT_APP_API || "";

const Prods = () => {
  const [prods, setProds] = useState([]);

  const getProds = async () => {
    await axios.get(`${api}products`).then((res) => setProds(res.data));
  };

  useEffect(() => {
    getProds();
  }, []);

  return (
    <div className="row">
      {prods.map((product) => (
        <div
          className="card col-md-3 m-3"
          key={product._id}
          style={{ width: "18rem" }}
        >
          <img src={product.image} className="card-img-top" alt="card img" />
          <div className="card-body">
            <h5 className="text-secondary">{product.category}</h5>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="text-secondary">{product.price} ₪</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prods;
