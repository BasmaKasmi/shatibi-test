import axios from "axios";
import Cookies from "js-cookie";

const BackendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

BackendApi.interceptors.request.use(function (config) {
  const token = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

BackendApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      /** redirect to login when unauthorized */
      window.location.pathname = "/login";
    }

    return Promise.reject(error);
  }
);

export default BackendApi;
