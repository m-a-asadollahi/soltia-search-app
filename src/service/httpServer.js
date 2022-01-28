import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  console.log("Respons");
  if (!error.response) {
    toast.error(error.message);
    return Promise.reject(error);
  }
  const expectedError =
    error.response.status &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default axios;
