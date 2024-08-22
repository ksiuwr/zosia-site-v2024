import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { RoomCards } from "@client/components/rooms/RoomCards";
import { templates } from "@reactivated";
import { parseISO } from "date-fns";
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
            lock: room.lock
              ? {
                  user: {
                    id: room.lock.user.id,
                    firstName: room.lock.user.first_name,
                    lastName: room.lock.user.last_name,
                  },
                  password:
                    props.user_room_lock.id === room.lock.id
                      ? props.user_room_lock.password
                      : undefined,
                  expirationDate: parseISO(room.lock.expiration_date),
                }
              : undefined,
            availableBedsSingle: room.available_beds_single,
            availableBedsDouble: room.available_beds_double,
          }))}
        />
      </CenteredContainer>
    </Layout>
  );
};
