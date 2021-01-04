import http from "./httpServices";
import { URL } from "../config.json";

export function getMovies() {
  return http.get(`${URL}/movies`);
}

export function deleteMovie(id) {
  return http.delete(`${URL}/movies/${id}`);
}
