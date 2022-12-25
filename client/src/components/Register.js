import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartState } from "../context/Context";
import { errorMsg, successMsg } from "../Services/feedbackService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API || " ";
  const {
    state: { userInfo },
    dispatch,
  } = CartState();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorMsg("Passwords don't match !");
      return;
    }
    try {
      const { data } = await axios.post(`${api}register`, {
        name,
        email,
        password,
        isAdmin,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      successMsg("Successfully Registered");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      errorMsg("Something went wrong !");
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
    <form className="mx-auto w-25 " onSubmit={submitHandler}>
      <h3 className="display-5 text-center mt-5">SIGN UP </h3>
      <div className="form-floating my-4">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          id="floatingInput_reg_name"
          placeholder="name@example.com"
          required
        />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating my-4">
        <input
          type="email"
          className="form-control"
          id="floatingInput_reg_email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name"
          required
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating my-4">
        <input
          type="password"
          className="form-control"
          id="floatingPassword_reg"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-floating my-4">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordConf"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <label htmlFor="floatingPassword">Confirm Password</label>
      </div>
      <div className="my-3 form-check">
        <input
          type="checkbox"
          onChange={(e) => setIsAdmin(e.target.checked )}
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Register as admin
        </label>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary w-50">
          Submit
        </button>
      </div>
      <p className="text-center mt-3">
        Already registered ? Sign in <Link to="/signin"> here</Link>
      </p>
    </form>
  );
};

export default Register;
