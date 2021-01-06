import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../services/authService";

axios.defaults.headers.common["x-auth-token"] = getToken();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("log error", error);
    toast.error("Unexpected error");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
