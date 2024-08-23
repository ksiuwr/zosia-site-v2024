import {
  convertRoomAPIDataToRoomData,
  ROOM_QUERY_KEY,
  RoomAPIData,
  RoomData,
} from "@client/utils/roomData";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Context } from "@reactivated";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Alert } from "../alert/Alert";
import { ApiErrorMessage } from "./ApiErrorMessage";
import { RoomCard } from "./RoomCard";

interface RoomCardsProps {
  /** This is initial room data, used during server-side rendering. */
  initialRoomData: RoomData[];
}

export const RoomCards = ({ initialRoomData }: RoomCardsProps) => {
  const { user } = useContext(Context);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [ROOM_QUERY_KEY],
    queryFn: async () => {
      const res = await zosiaApi.get<RoomAPIData[]>(zosiaApiRoutes.rooms);
      return res.data.map(convertRoomAPIDataToRoomData);
    },
    initialData: initialRoomData,
    // With SSR, set staleTime above 0 to avoid refetching immediately on the client
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return (
      <div className="my-20 flex justify-center">
        <span className="loading loading-spinner w-12 lg:w-24" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert type="error">
        <ApiErrorMessage error={error} />
      </Alert>
    );
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
