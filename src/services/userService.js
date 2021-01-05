import http from "./httpServices";
import { URL } from "../config.json";

const endPoint = `${URL}/users`;

export function register(user) {
  return http.post(endPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
