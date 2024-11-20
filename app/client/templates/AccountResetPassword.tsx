import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicForm } from "@client/components/forms/BasicForm";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AccountResetPassword) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Password reset</PageTitle>
      <CenteredFormContainer>
        <p className="prose mb-2">
          {
            "Forgotten your password? Enter your email address below, and we'll email you the instructions for setting a new one."
          }
        </p>
        <BasicForm form={form} submitButtonLabel="Reset password" />
      </CenteredFormContainer>
    </Layout>
  );
};
