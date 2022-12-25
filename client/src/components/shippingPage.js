import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../context/Context";

const ShippingPage = () => {
  const navigate = useNavigate();
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = CartState();
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalcode, setPostalCode] = useState(
    shippingAddress.postalcode || ""
  );
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalcode,
        country,
      },
    });

    // Save shipping data to local storage
    localStorage.setItem(
      "shipping address",
      JSON.stringify({
        fullName,
        address,
        city,
        postalcode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <form className="mx-auto form-width " onSubmit={submitHandler}>
        <h2 className="display-5 text-center mt-5">
          <b>Shipping Address</b>
        </h2>
        <div className="form-floating my-4">
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="floatingInput_reg_name"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Full Name</label>
        </div>
        <div className="form-floating my-4">
          <input
            type="text"
            className="form-control"
            id="floatingInput_reg_email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="name"
            required
          />
          <label htmlFor="floatingInput">Full Address</label>
        </div>
        <div className="form-floating my-4">
          <input
            type="text"
            value={city}
            className="form-control"
            id="floatingPassword_reg"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">City</label>
        </div>
        <div className="form-floating my-4">
          <input
            type="text"
            value={postalcode}
            className="form-control"
            id="floatingPassword_reg"
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Postal Code</label>
        </div>

        <div className="form-floating my-4">
          <input
            type="text"
            value={country}
            className="form-control"
            id="floatingPassword_reg"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Country</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-25">
            <b>Continue</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
