import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartState } from "../context/Context";
import { errorMsg } from "../Services/feedbackService";
const api = process.env.REACT_APP_API || " ";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    state: { userInfo },
    dispatch,
  } = CartState();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}signin`, { email, password });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      errorMsg("Invalid email or password");
    }
  };
// redirect to home page if the user navigates tp signin page 
//while logged in
  useEffect(() => { 
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <form className="mx-auto w-25 mt-5 " onSubmit={submitHandler}>
      <h3 className="display-5 text-center"> SIGN IN </h3>
      <div className="form-floating my-4">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating my-4">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary w-50">
          Submit
        </button>
      </div>
      <p className="text-center mt-3">
        New user? <Link to="/register"> Create new account</Link>
      </p>
    </form>
  );
};

export default Signin;
