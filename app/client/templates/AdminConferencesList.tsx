import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { getLocalYear } from "@client/utils/time";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminConferencesList) => {
  return (
    <AdminLayout>
      <PageTitle>Conferences</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={["Conference name", "Actions"]}
          addEntryLink={{
            href: reverse("zosia_add"),
            label: "Add conference",
          }}
        >
          {props.conferences.map((conference) => (
            <tr key={conference.id}>
              <td>{`ZOSIA ${getLocalYear(new Date(conference.start_date))}`}</td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("zosia_update", {
                      pk: conference.id,
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
