import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { Rooms } from "@client/components/rooms/Rooms";
import { createRoomDataFromTemplateProps } from "@client/utils/roomData";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Rooms) => {
  return (
    <Layout>
      <PageTitle>Rooms</PageTitle>
      <CenteredContainer>
        <Rooms initialRoomsData={createRoomDataFromTemplateProps(props)} />
      </CenteredContainer>
    </Layout>
  );
};
