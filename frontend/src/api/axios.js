import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002",
});

api.interceptors.request.use( //Interceptor matlab Har request ke bhejne se pehle kuch kaam karna.
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;