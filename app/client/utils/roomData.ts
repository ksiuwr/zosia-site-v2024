import { templates } from "@reactivated";
import { parseISO } from "date-fns/parseISO";

export const ROOM_QUERY_KEY = "rooms";

/** Single room data retrieved from server */
export interface RoomApiData {
  id: number;
  name: string;
  description: string;
  members: {
    user: RoomApiUserData;
    joined_at: string;
  }[];
  lock: {
    user: RoomApiUserData;
    password: string | null;
    expiration_date: string;
  } | null;
  available_beds_single: number;
  available_beds_double: number;
  hidden: boolean;
}

/** Data used to create a new room */
export interface RoomCreateApiData {
  name: string;
  description: string;
  available_beds_single: number;
  available_beds_double: number;
  beds_single: number;
  beds_double: number;
  hidden: boolean;
}

interface RoomApiUserData {
  id: number;
  first_name: string;
  last_name: string;
}

/** Single room data used in the client */
export interface RoomData {
  id: number;
  name: string;
  description: string;
  members: RoomMember[];
  lock?: {
    user: RoomMember;
    password?: string;
    expirationDate: Date;
  };
  availableBedsSingle: number;
  availableBedsDouble: number;
  hidden: boolean;
}

export interface RoomMember {
  id: number;
  firstName: string;
  lastName: string;
}

export const convertRoomApiDataToRoomData = (room: RoomApiData): RoomData => {
  return {
    id: room.id,
    name: room.name,
    description: room.description,
    members: room.members.map((member) => ({
      id: member.user.id,
      firstName: member.user.first_name,
      lastName: member.user.last_name,
    })),
    lock: room.lock
      ? {
          user: {
            id: room.lock.user.id,
            firstName: room.lock.user.first_name,
            lastName: room.lock.user.last_name,
          },
          password: room.lock.password ?? undefined,
          expirationDate: parseISO(room.lock.expiration_date),
        }
      : undefined,
    availableBedsSingle: room.available_beds_single,
    availableBedsDouble: room.available_beds_double,
    hidden: room.hidden,
  };
};

export const createRoomDataFromTemplateProps = (
  props: templates.Rooms | templates.AdminRoomsList,
): RoomData[] => {
  return props.rooms.map((room) => ({
    id: room.id,
    name: room.name,
    description: room.description,
    members: room.members.map((member) => ({
      id: member.id,
      firstName: member.first_name,
      lastName: member.last_name,
    })),
    lock: room.lock
      ? {
          user: {
            id: room.lock.user.id,
            firstName: room.lock.user.first_name,
            lastName: room.lock.user.last_name,
          },
          password:
            "user_room_lock" in props &&
            props.user_room_lock?.id === room.lock.id
              ? props.user_room_lock.password
              : undefined,
          expirationDate: parseISO(room.lock.expiration_date),
        }
      : undefined,
    availableBedsSingle: room.available_beds_single,
    availableBedsDouble: room.available_beds_double,
    hidden: room.hidden,
  }));
};
