import { reverse } from "@reactivated";
import axios from "axios";

export const zosiaApi = axios.create({
  // '/' in baseURL resolves to the current domain
  // so for example in development it will be http://localhost:8000/
  // and in production https://zosia.org/
  baseURL: "/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export const zosiaApiRoutes = {
  organizations: "api/v1/users/organizations/",
  addLectureDurations: reverse("load_durations"),
};
