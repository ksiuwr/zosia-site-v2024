import { reverse } from "@reactivated";
import axios, { AxiosError } from "axios";

export interface RoomAPIData {
  id: number;
  name: string;
  description: string;
  members: {
    user: RoomAPIUserData;
    joined_at: string;
  }[];
  lock: {
    user: RoomAPIUserData;
    password: string | null;
    expiration_date: string;
  } | null;
  available_beds_single: number;
  available_beds_double: number;
}

interface RoomAPIUserData {
  id: number;
  first_name: string;
  last_name: string;
}

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
  rooms: "api/v2/rooms/",
  roomMember: (roomId: number) => `api/v2/rooms/${roomId}/member/`,
  lockRoom: (roomId: number) => `api/v2/rooms/${roomId}/lock/`,
};

export const apiErrorMessageHTML = (error: Error) => {
  if (axios.isAxiosError(error)) {
    return apiAxiosErrorMessageHTML(error);
  }

  return error.message;
};

const apiAxiosErrorMessageHTML = (error: AxiosError) => {
  const responseData = error.response?.data;

  if (typeof responseData === "string") {
    return escapeHtml(responseData);
  }

  if (typeof responseData === "object" && responseData !== null) {
    const infos = Object.entries(responseData).map((e) => {
      const msg = Array.isArray(e[1])
        ? e[1].map(escapeHtml).join("<br/>")
        : escapeHtml(e[1] as string);

      return (
        "<span><strong>" + escapeHtml(e[0]) + "</strong><br/>" + msg + "</span>"
      );
    });

    return "<p>" + infos.join("<br/><br/>") + "</p>";
  }

  return "There was an internal error with your request. Please contact site administrators.";
};

const escapeHtml = (input: string) => {
  const mapping = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return input.replace(
    /[&<>"']/g,
    (match) => mapping[match as keyof typeof mapping],
  );
};
