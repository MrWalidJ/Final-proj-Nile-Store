import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { errorMsg, successMsg } from "../Services/feedbackService";

const ResetPassword = () => {
  const api = process.env.REACT_APP_API || " ";
  //const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();
  const url = `${api}reset-password/${id}/${token}`;
  // console.log(id);
  // console.log(to);

  useEffect(() => {
    const verifyUrl = async () => {
      setLoading(true);
      try {
        await axios.get(url);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    verifyUrl();
  }, [url]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorMsg("Passwords don't match !");
      return;
    }
    try {
      const { data } = await axios.post(`${url}`, {
        password,
      });
      successMsg(data.message);
      navigate("/signin");
    } catch (err) {
      errorMsg("Session Expired !");
    }
  };
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <h1 className="text-center mt-5"> 404 Page Not Found</h1>
      ) : (
        <form className="mx-auto w-25 " onSubmit={submitHandler}>
          <h3 className="display-5 text-center mt-5">Reset Password </h3>
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

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ResetPassword;
