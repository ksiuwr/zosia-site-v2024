import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { BasicForm } from "@client/components/forms/BasicForm";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminTransportUpdate) => {
  const form = useForm({ form: props.form });

  const pageTitle = props.edit_mode ? "Update transport" : "Add transport";

  return (
    <AdminLayout>
      <PageTitle>{pageTitle}</PageTitle>
      <AdminCenteredFormContainer>
        <BasicForm form={form} submitButtonLabel={pageTitle}></BasicForm>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
