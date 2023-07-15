import axios from "axios";

export const API_MELI = axios.create({
  baseURL: "https://api.mercadolibre.com/",
});
