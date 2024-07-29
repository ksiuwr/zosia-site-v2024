import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

export const zosiaApi = axios.create({
  baseURL: isProduction ? "https://zosia.org/api/" : "http://0.0.0.0:8000/api/",
  withCredentials: true,
});

export const zosiaApiRoutes = {
  organizations: "v1/users/organizations/",
};
