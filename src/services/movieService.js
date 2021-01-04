import http from "./httpServices";
const URL = "http://localhost:3900/api/movies";

export function getMovies() {
  return http.get(URL);
}

export function deleteMovie(id) {
  return http.delete(`${URL}/${id}`);
}
