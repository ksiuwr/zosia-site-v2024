import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { PageTitle } from "@client/components/PageTitle";
import { getLocalTime } from "@client/utils/time";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminTransportPassangers) => {
  return (
    <AdminLayout>
      <PageTitle>{`${props.transport.name} (${getLocalTime(new Date(props.transport.departure_time))})`}</PageTitle>
      <AdminCenteredContentContainer>
        <div className="prose mx-auto">
          <ol>
            {props.users.map((user) => (
              <li
                key={user.id}
              >{`${user.user.first_name} ${user.user.last_name} ${user.is_student ? "(student)" : ""}`}</li>
            ))}
          </ol>
        </div>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
