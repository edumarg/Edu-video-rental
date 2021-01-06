import http from "./httpServices";
import { URL } from "../config.json";

const endPoint = `${URL}/auth`;

export function login(user) {
  return http.post(endPoint, {
    email: user.username,
    password: user.password,
  });
}
