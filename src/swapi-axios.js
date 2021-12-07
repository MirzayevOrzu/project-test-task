import axios from "axios";

const swapiApi = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 10000,
});

export default swapiApi;