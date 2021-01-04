import http from "./httpServices";
import { URL } from "../config.json";

const endPoint = `${URL}/movies`;

export function getMovies() {
  return http.get(endPoint);
}

export function getMovie(id) {
  return http.get(`${endPoint}/${id}`);
}

export function deleteMovie(id) {
  return http.delete(`${endPoint}/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${endPoint}/${movie._id}`, body);
  }
  return http.post(endPoint, movie);
}
