import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account")).token
        : null
    }`,
  },
});
