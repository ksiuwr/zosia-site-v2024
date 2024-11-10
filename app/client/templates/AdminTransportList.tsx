import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { AdminTablePassengersLink } from "@client/components/admin/tables/AdminTablePassengersLink";
import { PageTitle } from "@client/components/PageTitle";
import { getLocalTime } from "@client/utils/time";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminTransportList) => {
  return (
    <AdminLayout>
      <PageTitle>Transport</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={[
            "Transport name",
            "Departure time",
            "Taken seats/Capacity",
            "Actions",
          ]}
          addEntryLink={{
            href: reverse("transport_add"),
            label: "Add transport",
          }}
        >
          {props.transports.map((transport) => (
            <tr key={transport.id}>
              <td>{transport.name}</td>
              <td>{getLocalTime(new Date(transport.departure_time))}</td>
              <td>{`${transport.passengers.length}/${transport.capacity}`}</td>
              <td>
                <AdminTableActions>
                  <AdminTablePassengersLink
                    href={reverse("transport_people", {
                      pk: transport.id,
                    })}
                  />
                  <AdminTableEditLink
                    href={reverse("transport_update", {
                      pk: transport.id,
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
