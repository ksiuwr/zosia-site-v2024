import {
  apiErrorMessageHTML,
  RoomAPIData,
  zosiaApi,
  zosiaApiRoutes,
} from "@client/utils/zosiaApi";
import { Context } from "@reactivated";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import parse from "html-react-parser";
import React, { useContext } from "react";
import { Alert } from "../alert/Alert";
import { RoomCard } from "./RoomCard";

export interface RoomData {
  id: number;
  name: string;
  description: string;
  members: RoomMember[];
  availableBedsSingle: number;
  availableBedsDouble: number;
}

export interface RoomMember {
  id: number;
  firstName: string;
  lastName: string;
}

interface RoomCardsProps {
  initialRoomData: RoomData[];
}

export const RoomCards = ({ initialRoomData }: RoomCardsProps) => {
  const { user } = useContext(Context);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [zosiaApiRoutes.rooms],
    queryFn: async () => {
      const res = await zosiaApi.get(zosiaApiRoutes.rooms);
      const rooms = res.data as RoomAPIData[];

      return rooms.map((room) => ({
        id: room.id,
        name: room.name,
        description: room.description,
        members: room.members.map((member) => ({
          id: member.user.id,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
        })),
        availableBedsSingle: room.available_beds_single,
        availableBedsDouble: room.available_beds_double,
      }));
    },
    initialData: initialRoomData,
  });

  if (isPending) {
    return (
      <div className="my-20 flex justify-center">
        <span className="loading loading-spinner w-12 lg:w-24" />
      </div>
    );
  }

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? parse(apiErrorMessageHTML(error))
      : error.message;
    return <Alert type="error">{errorMessage}</Alert>;
  }

  const userIsInSomeRoomAlready = data.some((room) =>
    room.members.some((member) => member.id === user.id),
  );

  return (
    <div className="mb-6 flex flex-col gap-5 lg:grid lg:grid-cols-2">
      {data.map((room) => (
        <RoomCard
          key={room.name}
          roomData={room}
          userIsInSomeRoomAlready={userIsInSomeRoomAlready}
        ></RoomCard>
      ))}
    </div>
  );
};
