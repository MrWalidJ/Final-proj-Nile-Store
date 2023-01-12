import React, { useState } from "react";
import axios from "axios";
import { errorMsg, successMsg } from "../Services/feedbackService";


const Contact = () => {
  const api = process.env.REACT_APP_API;
  const [inputs, setInputs] = useState({
    Fname: "",
    Lname: "",
    email: "",
    message: "",
  });

  const addCont = async () =>
    await axios.post(`${api}contacts`, {
      Fname: String(inputs.Fname),
      Lname: String(inputs.Lname),
      email: String(inputs.email),
      message: String(inputs.message),
    });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
console.log(inputs);
  const submitHandler = async (e) => {
    e.preventDefault();
    addCont()
      .then((res) => {
        successMsg("Post Successfully Sent ");
      })
      .catch((err) => errorMsg("Something went wrong !!"));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5 me-5">
          <h1 className="display-3  text-center">Contact Us</h1>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={handleChange}
                placeholder="First name"
                name="Fname"
                required
              />
              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                onChange={handleChange}
                placeholder="Last name"
                name="Lname"
                required
              />
              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                placeholder="name@example.com"
                name="email"
                required
                email="true"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div>
              <label htmlFor="share">Type your message bellow</label>
              <textarea
                className="form-control mt-2"
                name="message"
                id="share"
                onChange={handleChange}
                cols="30"
                rows="7"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Send
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <h1 className="display-3  text-center">Our Location</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39750.478922813505!2d-0.06309374418187148!3d51.48743624623917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9cea79975f3%3A0x1470a7a162e4ca6c!2sGreenwich%2C%20London%2C%20UK!5e0!3m2!1sen!2sil!4v1673026748849!5m2!1sen!2sil"
            width="600"
            title="My Map"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
