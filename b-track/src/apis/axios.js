import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "http://18.212.48.70:3000",
});

export default instance;
