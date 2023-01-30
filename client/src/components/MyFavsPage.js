import { useEffect, useState } from "react";
import axios from "axios";
import { CartState } from "../context/Context";

const MyFavsPage = () => {
  const [favs, setFavs] = useState([]);
  const api = process.env.REACT_APP_API || "";
  const {
    state: { userInfo },
  } = CartState();
  useEffect(() => {
    if (userInfo) {
    }
    const getFavs = async () => {
      try {
        const { data } = await axios.get(`${api}favs/my-favs`, {
          headers: { Authorization: `${userInfo.token}` },
        });
        setFavs(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getFavs();
  }, [userInfo, api]);
  return (
    <div>
      {favs.length ? (
        <table className="table table-striped mx-3">
          <thead>
            <tr>
              <th> Image </th>
              <th> Name </th>
              <th> Category </th>
              <th> Price </th>
            </tr>
          </thead>
          <tbody>
            {favs.map((product) => (
              <tr key={product._id}>
                <td className="col-md-3 ">
                  <img
                    className="w-25 "
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td className="col-md-3 ">{product.name}</td>
                <td className="col-md-3 ">{product.category}</td>
                <td className="col-md-3 ">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1> No products in favorites </h1>
      )}
    </div>
  );
};

export default MyFavsPage;
