import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableDeleteLink } from "@client/components/admin/tables/AdminTableDeleteLink";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminOrganizersList) => {
  return (
    <AdminLayout>
      <PageTitle>Organizers</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable headerNames={["Name", "Phone number", "Actions"]}>
          {props.organizers.map((organizer) => (
            <tr key={organizer.id}>
              <td>{`${organizer.user.first_name} ${organizer.user.last_name}`}</td>
              <td>{organizer.phone_number}</td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("organizers_edit", {
                      contact_id: organizer.id,
                    })}
                  />
                  <AdminTableDeleteLink
                    href={reverse("organizers_delete", {
                      contact_id: organizer.id,
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
