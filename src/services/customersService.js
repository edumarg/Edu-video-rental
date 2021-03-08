import http from "./httpServices";

export function getCustomers() {
  return http.get(`/customers`);
}
