import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminCharts } from "@client/components/admin/statistics/AdminCharts";
import { PageTitle } from "@client/components/PageTitle";
import { templates } from "@reactivated";

import React from "react";

export const Template = (props: templates.AdminStatistics) => {
  return (
    <AdminLayout>
      <PageTitle>Statistics</PageTitle>
      <AdminCenteredContentContainer>
        <div className="prose prose-xl">
          <p>
            <strong>Registered users: </strong> {props.num_of_registered_users}
            <br />
            <strong>Students: </strong> {props.num_of_students}
            <br />
            <strong>Vegetarians: </strong> {props.num_of_vegetarians}
          </p>
        </div>

        <span className="divider" />

        <AdminCharts {...props} />
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
