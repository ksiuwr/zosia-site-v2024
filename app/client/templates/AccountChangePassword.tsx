import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicForm } from "@client/components/forms/BasicForm";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AccountChangePassword) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Change password</PageTitle>
      <CenteredFormContainer>
        <BasicForm form={form} submitButtonLabel="Change password" />
      </CenteredFormContainer>
    </Layout>
  );
};
