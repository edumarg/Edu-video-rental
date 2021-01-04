import http from "./httpServices";
const URL = "http://localhost:3900/api/genres";

export function getGenres() {
  return http.get(URL);
}
