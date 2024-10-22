import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { RoomCards } from "@client/components/rooms/RoomCards";
import { RoomsBar, RoomsSortBy } from "@client/components/rooms/RoomsBar";
import { createRoomDataFromTemplateProps } from "@client/utils/roomData";
import { templates } from "@reactivated";
import React, { useState } from "react";

export const Template = (props: templates.Rooms) => {
  const [searchText, setSearchText] = useState("");
  const [hideFullRooms, setHideFullRooms] = useState(false);
  const [sortRoomsBy, setSortRoomsBy] = useState<RoomsSortBy>("roomNumber");

  return (
    <Layout>
      <PageTitle>Rooms</PageTitle>
      <CenteredContainer>
        <RoomsBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          hideFullRooms={hideFullRooms}
          onHideFullRoomsChange={setHideFullRooms}
          sortRoomsBy={sortRoomsBy}
          onSortRoomsByChange={setSortRoomsBy}
        />
        <RoomCards
          initialRoomData={createRoomDataFromTemplateProps(props)}
          searchText={searchText}
          hideFullRooms={hideFullRooms}
          sortRoomsBy={sortRoomsBy}
        />
      </CenteredContainer>
    </Layout>
  );
};
