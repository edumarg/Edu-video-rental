import jwtDecode from "jwt-decode";

import http from "./httpServices";

const endPoint = `/auth`;
const tokenKey = "esternocleidomastoideo";

export async function login(user) {
  const response = await http.post(endPoint, {
    email: user.username,
    password: user.password,
  });
  const token = response.data;
  console.log("received token", token);
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

http.setToken(getToken());
