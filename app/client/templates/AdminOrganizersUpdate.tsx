import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { BasicForm } from "@client/components/forms/BasicForm";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminOrganizersUpdate) => {
  const form = useForm({ form: props.form });

  return (
    <AdminLayout>
      <PageTitle>
        {props.organizer_name ? "Edit organizer" : "Add organizer"}
      </PageTitle>
      <AdminCenteredFormContainer>
        {props.organizer_name && (
          <p className="prose prose-lg mb-4">
            User name:
            <strong>{` ${props.organizer_name}`}</strong>
          </p>
        )}
        <BasicForm
          form={form}
          submitButtonLabel={
            props.organizer_name ? "Edit organizer" : "Add organizer"
          }
        ></BasicForm>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
