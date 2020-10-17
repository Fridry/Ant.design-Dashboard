import axios from "axios";

const api = axios.create({
  baseURL: "https://company-rest-api.herokuapp.com",
});

export default api;
