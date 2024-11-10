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

  const selectedGroupField = form.fields.select_groups.value
    ? form.fields[form.fields.select_groups.value as UserGroup]
    : undefined;

  return (
    <AdminLayout>
      <PageTitle>Send email to users</PageTitle>
      <AdminCenteredFormContainer>
        <BasicFormWithCustomFields form={form} submitButtonLabel="Send email">
          <BasicFormField field={form.fields.subject} />
          <BasicFormField field={form.fields.text} />
          <BasicFormField field={form.fields.select_groups} />
          {selectedGroupField && <BasicFormField field={selectedGroupField} />}
          <p className="prose max-w-none">
            This message will be sent to the following recipients:
            <br />
            <strong>{selectedGroupField?.value.join(", ")}</strong>
          </p>
        </BasicFormWithCustomFields>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
