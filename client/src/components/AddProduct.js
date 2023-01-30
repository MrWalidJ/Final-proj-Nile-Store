import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { errorMsg, successMsg } from "../Services/feedbackService";
import { CartState } from "../context/Context";

const AddProduct = () => {
  const {
    state: { userInfo },
  } = CartState();
  const api = process.env.REACT_APP_API;
  const navigate = useNavigate();

  const addProd = async () =>
    await axios.post(
      `${api}products`,
      {
        name: String(inputs.name),
        price: Number(inputs.price),
        category: String(inputs.category),
        description: String(inputs.description),
        image: String(inputs.image),
        inStock: Number(inputs.inStock),
      },
      {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      }
    );
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    inStock: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    addProd()
      .then((res) => {
        console.log(res.data);
        successMsg("Product added successfully ");
        navigate("/");
      })
      .catch((err) => errorMsg("Something went wrong !!"));
  };

  return (
    <form className="mx-auto w-25 " onSubmit={submitHandler}>
      <h3 className="display-5 text-center mt-5">Add Product </h3>
      <div className="form-floating my-4">
        <input
          id="ap_name"
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Name"
          name="name"
          required
        />
        <label htmlFor="ap_name">Name</label>
      </div>
      <div className="form-floating my-4">
        <input
          id="ap_price"
          type="number"
          className="form-control"
          placeholder="Price"
          onChange={handleChange}
          name="price"
          required
        />
        <label htmlFor="ap_price">Price</label>
      </div>
      <div className="my-4">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          name="category"
          onChange={handleChange}
        >
          <option selected disabled>
            Category
          </option>
          <option value="Smartphones" on>
            Smartphones
          </option>
          <option value="Laptops">Laptops</option>
        </select>
      </div>
      <div className="form-floating my-4">
        <input
          id="floatingInput"
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Description"
          name="description"
          required
        />
        <label htmlFor="floatingInput">Description</label>
      </div>
      <div className="form-floating my-4">
        <input
          id="ap_img"
          type="text"
          className="form-control"
          placeholder="Image link"
          onChange={handleChange}
          name="image"
          required
        />
        <label htmlFor="ap_img">Image</label>
      </div>
      <div className="form-floating my-4">
        <input
          id="ap_stk"
          type="number"
          placeholder="Amount in stok"
          className="form-control"
          onChange={handleChange}
          name="inStock"
          required
        />
        <label htmlFor="ap_stk">In Stock</label>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary w-50">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
