import { reverse } from "@reactivated";
import axios from "axios";

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
