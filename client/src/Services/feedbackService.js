import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMsg = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER, // built in commands
    autoClose: 3000, // close after 3 s
  });
};

export const errorMsg = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER, // built in commands
    autoClose: 3000, // close after 3 s
  });
};