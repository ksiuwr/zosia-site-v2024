import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { RoomCards } from "@client/components/rooms/RoomCards";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Rooms) => {
  return (
    <Layout>
      <PageTitle>Rooms</PageTitle>
      <CenteredContainer>
        <RoomCards
          initialRoomData={props.rooms.map((room) => ({
            id: room.id,
            name: room.name,
            description: room.description,
            members: room.members.map((member) => ({
              id: member.id,
              firstName: member.first_name,
              lastName: member.last_name,
            })),
            availableBedsSingle: room.available_beds_single,
            availableBedsDouble: room.available_beds_double,
          }))}
        />
      </CenteredContainer>
    </Layout>
  );
};
