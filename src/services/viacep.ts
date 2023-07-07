import axios from "axios";

const http = axios.create({
  baseURL: "https://viacep.com.br/ws/", //adicionar ao get do form {cep}/json/
});

export default http;