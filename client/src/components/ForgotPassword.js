import React, { useState } from "react";
import axios from "axios";
import { errorMsg, successMsg } from "../Services/feedbackService";
const api = process.env.REACT_APP_API || " ";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}forgot-password`, { email });
      successMsg(data.message);
    } catch (err) {
      errorMsg("Invalid email ");
    }
  };
  return (
    <form className="mx-auto w-25 mt-5 " onSubmit={submitHandler}>
      <h3 className="display-5 text-center"> Forgot Password </h3>
      <div className="form-floating my-4">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingInput">Enter your email address</label>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary w-50">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
