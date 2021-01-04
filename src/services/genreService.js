import http from "./httpServices";
import { URL } from "../config.json";

export function getGenres() {
  return http.get(`${URL}/genres`);
}
