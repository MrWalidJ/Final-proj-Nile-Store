import axios from "axios";
const api = process.env.REACT_APP_API;

export const getProduct = async (id) => {
  return await axios.get(`${api}products/${id}`);
};
