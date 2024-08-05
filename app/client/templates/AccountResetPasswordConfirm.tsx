import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicForm } from "@client/components/forms/BasicForm";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AccountResetPasswordConfirm) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Password reset</PageTitle>
      <CenteredFormContainer>
        {props.validlink ? (
          <>
            <p className="prose mb-2">
              {
                "Please enter your new password twice, so we can verify you typed it in correctly."
              }
            </p>
            <BasicForm form={form} submitButtonLabel="Reset password" />
          </>
        ) : (
          <>
            <p className="prose mb-2">
              {
                "The password reset link was invalid, possibly because it has already been used. Please request a new password reset."
              }
            </p>
            <a
              className="btn btn-primary btn-lg btn-block"
              href={reverse("password_reset")}
            >
              Lost password?
            </a>
          </>
        )}
      </CenteredFormContainer>
    </Layout>
  );
};
