import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8001/",
  headers: {
    "Content-type": "application/json",
  },
});
