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
import { RoomsSortBy } from "./RoomsBar";

interface RoomCardsProps {
  /** This is initial room data, used during server-side rendering. */
  initialRoomData: RoomData[];

  searchText: string;
  hideFullRooms: boolean;
  sortRoomsBy: RoomsSortBy;
}

export const RoomCards = ({
  initialRoomData,
  searchText,
  hideFullRooms,
  sortRoomsBy,
}: RoomCardsProps) => {
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

  const userRoom = data.find((room) =>
    room.members.some((member) => member.id === user.id),
  );

  const isUserInsideRoom = (room: RoomData) =>
    userRoom && userRoom.id === room.id;

  const searchResults = searchText
    ? data.filter(
        (room) =>
          isUserInsideRoom(room) ||
          room.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : data;

  const filteredResults = hideFullRooms
    ? searchResults.filter(
        (room) =>
          isUserInsideRoom(room) ||
          room.availableBedsSingle + room.availableBedsDouble * 2 >
            room.members.length,
      )
    : searchResults;

  const sortedResults = filteredResults.sort((roomA, roomB) => {
    if (sortRoomsBy == "roomNumber") {
      const roomANumber = parseInt(roomA.name.replace(/\D/g, ""));
      const roomBNumber = parseInt(roomB.name.replace(/\D/g, ""));

      if (!Number.isNaN(roomANumber) && !Number.isNaN(roomBNumber)) {
        if (roomANumber > roomBNumber) return 1;
        if (roomANumber < roomBNumber) return -1;
      }

      if (roomA.name > roomB.name) return 1;
      if (roomA.name < roomB.name) return -1;
    }

    if (sortRoomsBy == "fullness") {
      const roomAFullness =
        roomA.members.length /
        (roomA.availableBedsSingle + roomA.availableBedsDouble * 2);
      const roomBFullness =
        roomB.members.length /
        (roomB.availableBedsSingle + roomB.availableBedsDouble * 2);

      if (roomAFullness > roomBFullness) return 1;
      if (roomAFullness < roomBFullness) return -1;
    }

    // Fallback sorting
    return roomA.id - roomB.id;
  });

  return (
    <div className="mb-6 flex flex-col gap-5 lg:grid lg:grid-cols-2">
      {sortedResults.map((room) => (
        <RoomCard
          key={room.name}
          roomData={room}
          userIsInSomeRoomAlready={userRoom !== undefined}
        ></RoomCard>
      ))}
    </div>
  );
};
