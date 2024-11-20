import { AdminAcceptedCheckbox } from "@client/components/admin/AdminAcceptedCheckbox";
import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { zosiaApiRoutes } from "@client/utils/zosiaApi";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminUsersOrganizationList) => {
  return (
    <AdminLayout>
      <PageTitle>Organizations</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={[
            "Organization name",
            "Proposed by",
            "Accepted?",
            "Actions",
          ]}
          addEntryLink={{
            href: reverse("organization_add"),
            label: "Add organization",
          }}
        >
          {props.organizations.map((organization) => (
            <tr key={organization.id}>
              <td>{organization.name}</td>
              <td>{`${organization.user?.first_name || ""} ${organization.user?.last_name || ""}`}</td>
              <td>
                <AdminAcceptedCheckbox
                  id={organization.id}
                  initialIsAccepted={organization.accepted}
                  apiRoute={zosiaApiRoutes.adminOrganizationsToggleAccept}
                  errorMessage="Error while toggling organization accepted state."
                />
              </td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("organization_update", {
                      pk: organization.id,
                    })}
                  />
                </AdminTableActions>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
