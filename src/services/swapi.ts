import axios from "axios";

const http = axios.create({
  baseURL: "https://swapi.dev/api/vehicles",
});

export default http;
