import { reverse } from "@reactivated";
import axios from "axios";

export const zosiaApi = axios.create({
  baseURL: "/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export const zosiaApiRoutes = {
  organizations: "api/v1/users/organizations/",
  addLectureDurations: reverse("load_durations"),
};
