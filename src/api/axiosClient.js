import axios from "axios";
import StorageKeys from "../constants/storage-keys";
import { getToken } from "../utils/jwt";

let tokenLocal = localStorage.getItem(StorageKeys.TOKEN);

if (tokenLocal) {
  tokenLocal = JSON.stringify(tokenLocal);
}

const axiosClient = axios.create({
  baseURL: "https://petshop347.herokuapp.com/api",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers.x_authorization = (getToken() || tokenLocal)?.replace(
        /"/g,
        ""
      );
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
