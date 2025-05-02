import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/", // Backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
