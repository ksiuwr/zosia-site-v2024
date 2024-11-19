import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminPlacesList) => {
  return (
    <AdminLayout>
      <PageTitle>Places</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={["Place", "Actions"]}
          addEntryLink={{
            href: reverse("place_add"),
            label: "Add place",
          }}
        >
          {props.places.map((place) => (
            <tr key={place.id}>
              <td>{place.name}</td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("place_update", {
                      pk: place.id,
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
