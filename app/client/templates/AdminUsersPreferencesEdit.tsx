import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { BasicForm } from "@client/components/forms/BasicForm";
import { PageTitle } from "@client/components/PageTitle";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { reverse, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminUsersPreferencesEdit) => {
  const form = useForm({ form: props.form });

  return (
    <AdminLayout>
      <PageTitle>Edit user preferences</PageTitle>
      <AdminCenteredFormContainer>
        <p className="prose prose-lg mb-4">
          User name:
          <strong>{` ${props.user.first_name} ${props.user.last_name}`}</strong>
          <br />
          Email:
          <strong>{` ${props.user.email}`}</strong>
        </p>
        <BasicForm form={form} submitButtonLabel="Update preferences" />
        <a
          className="btn btn-outline btn-block"
          href={reverse("user_preferences_index")}
        >
          <ArrowLeftIcon className="size-6" /> Back to user preferences list
        </a>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
