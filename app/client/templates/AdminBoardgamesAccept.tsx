import { AdminAcceptedCheckbox } from "@client/components/admin/AdminAcceptedCheckbox";
import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { PageTitle } from "@client/components/PageTitle";
import { zosiaApiRoutes } from "@client/utils/zosiaApi";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminBoardgamesAccept) => {
  return (
    <AdminLayout>
      <PageTitle>Accept boardgames</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={["Boardgame name", "Proposed by", "Accepted?"]}
          addEntryLink={{
            href: reverse("boardgames_create"),
            label: "Add boardgame",
          }}
        >
          {props.boardgames.map((boardgame) => (
            <tr key={boardgame.id}>
              <td>
                <a href={boardgame.url} className="link">
                  {boardgame.name}
                </a>
              </td>
              <td>{`${boardgame.user?.first_name || ""} ${boardgame.user?.last_name || ""}`}</td>
              <td>
                <AdminAcceptedCheckbox
                  id={boardgame.id}
                  initialIsAccepted={boardgame.accepted}
                  apiRoute={zosiaApiRoutes.adminBoardgamesToggleAccept}
                  errorMessage="Error while toggling boardgame accepted state."
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
