import { RoomData } from "@client/utils/roomData";
import React, { useState } from "react";
import { RoomCards } from "./RoomCards";
import { RoomsBar, RoomsSortBy } from "./RoomsBar";

interface RoomsProps {
  initialRoomsData: RoomData[];
  isAdmin?: boolean;
}

export const Rooms = ({ initialRoomsData, isAdmin }: RoomsProps) => {
  const [searchText, setSearchText] = useState("");
  const [hideFullRooms, setHideFullRooms] = useState(false);
  const [sortRoomsBy, setSortRoomsBy] = useState<RoomsSortBy>("roomNumber");

  return (
    <>
      <RoomsBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        hideFullRooms={hideFullRooms}
        onHideFullRoomsChange={setHideFullRooms}
        sortRoomsBy={sortRoomsBy}
        onSortRoomsByChange={setSortRoomsBy}
        isAdmin={isAdmin}
      />
      <RoomCards
        initialRoomData={initialRoomsData}
        searchText={searchText}
        hideFullRooms={hideFullRooms}
        sortRoomsBy={sortRoomsBy}
        isAdmin={isAdmin}
      />
    </>
  );
};
