import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

type UserGroup =
  | "pick"
  | "all_users"
  | "staff"
  | "active"
  | "inactive"
  | "registered"
  | "paid"
  | "not_paid";

export const Template = (props: templates.AdminUsersSendEmail) => {
  const form = useForm({ form: props.form });

  return (
    <AdminLayout>
      <PageTitle>Send email to users</PageTitle>
      <AdminCenteredFormContainer>
        <BasicFormWithCustomFields form={form} submitButtonLabel="Send email">
          <BasicFormField field={form.fields.subject} />
          <BasicFormField field={form.fields.text} />
          <BasicFormField field={form.fields.select_groups} />
          {form.fields.select_groups.value && (
            <BasicFormField
              field={form.fields[form.fields.select_groups.value as UserGroup]}
            />
          )}
        </BasicFormWithCustomFields>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
