import jwtDecode from "jwt-decode";

import http from "./httpServices";
import { URL } from "../config.json";

const endPoint = `${URL}/auth`;
const tokenKey = "token";

export async function login(user) {
  const response = await http.post(endPoint, {
    email: user.username,
    password: user.password,
  });
  const token = response.data;
  localStorage.setItem(tokenKey, token);
}

export function loginWithToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    const myUser = jwtDecode(token);
    return myUser;
  } catch (exception) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}
