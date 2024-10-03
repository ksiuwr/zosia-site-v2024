import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminSponsorsList) => {
  return (
    <AdminLayout>
      <PageTitle>Sponsors</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable headerNames={["Name", "Type", "Active", "Actions"]}>
          {props.sponsors
            .sort((sponsor1, sponsor2) =>
              sponsor1.name.localeCompare(sponsor2.name),
            )
            .map((sponsor) => (
              <tr key={sponsor.id}>
                <td>{sponsor.name}</td>
                <td>
                  {sponsor.sponsor_type.charAt(0).toUpperCase() +
                    sponsor.sponsor_type.slice(1)}
                </td>
                <td>{sponsor.is_active ? "Yes" : "No"}</td>
                <td>
                  <AdminTableActions>
                    <AdminTableEditLink
                      href={reverse("sponsors_edit", {
                        sponsor_id: sponsor.id,
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
