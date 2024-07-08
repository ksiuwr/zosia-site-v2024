import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicForm } from "@client/components/forms/BasicForm";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.SignUp) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Sign Up</PageTitle>
      <CenteredFormContainer>
        <BasicForm form={form} submitButtonLabel="Register" />
        {/* TODO: Add reCaptcha */}
      </CenteredFormContainer>
    </Layout>
  );
};
