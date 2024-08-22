import { RoomAPIData, zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Context } from "@reactivated";
import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import React, { useContext } from "react";
import { Alert } from "../alert/Alert";
import { ApiErrorMessage } from "./ApiErrorMessage";
import { RoomCard } from "./RoomCard";

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
}

export interface RoomMember {
  id: number;
  firstName: string;
  lastName: string;
}

interface RoomCardsProps {
  /** This is initial room data, used during server-side rendering. */
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
      }));
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
