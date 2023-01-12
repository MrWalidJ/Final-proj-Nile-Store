import { useEffect, useState } from "react";
import axios from "axios";
import { CartState } from "../context/Context";

const api = process.env.REACT_APP_API || " ";

const Profile = () => {
  const {
    state: { userInfo },
  } = CartState();
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    isAdmin: false,
  });
  useEffect(() => {
    axios
      .get(`${api}profile`, {
        headers: { Authorization: `${userInfo.token}` },
      })
      .then((result) => {
        setUser(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err)); 
  }, [userInfo]);

  return (
    <>
      <div className="card my-3" style={{ maxWidth: "40vw" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="/images/userImg.png"
              className="img-fluid rounded-start"
              width="200px"
              alt = {user.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text"><b>{user.email}</b></p>
              {user.isAdmin && <b> User is ADMIN</b> }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
