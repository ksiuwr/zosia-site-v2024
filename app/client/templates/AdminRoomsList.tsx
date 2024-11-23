import { AdminCenteredContainer } from "@client/components/admin/layout/AdminCenteredContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { PageTitle } from "@client/components/PageTitle";
import { Rooms } from "@client/components/rooms/Rooms";
import { createRoomDataFromTemplateProps } from "@client/utils/roomData";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminRoomsList) => {
  return (
    <AdminLayout>
      <PageTitle>Rooms Admin</PageTitle>
      <AdminCenteredContainer>
        <Rooms
          initialRoomsData={createRoomDataFromTemplateProps(props)}
          isAdmin
        />
      </AdminCenteredContainer>
    </AdminLayout>
  );
};
