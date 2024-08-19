import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { RoomCard } from "@client/components/rooms/RoomCard";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Rooms) => {
  return (
    <Layout>
      <PageTitle>Rooms</PageTitle>
      <CenteredContainer>
        <div className="mb-6 flex flex-col gap-5 lg:grid lg:grid-cols-2">
          {props.rooms.map((room) => (
            <RoomCard
              key={room.name}
              name={room.name}
              description={room.description}
              members={room.members.map((member) => ({
                id: member.id,
                firstName: member.first_name,
                lastName: member.last_name,
              }))}
              availableBedsSingle={room.available_beds_single}
              availableBedsDouble={room.available_beds_double}
            ></RoomCard>
          ))}
        </div>
      </CenteredContainer>
    </Layout>
  );
};
