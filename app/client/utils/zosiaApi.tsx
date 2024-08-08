import axios from "axios";

export const zosiaApi = axios.create({
  // '/' in front of baseURL means that it will be appended to the current domain
  // so if the current domain is http://localhost:8000, then the baseURL will be http://localhost:8000/api/
  // and for https://zosia.org it will be https://zosia.org/api/
  baseURL: "/api/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export const zosiaApiRoutes = {
  organizations: "v1/users/organizations/",
};
