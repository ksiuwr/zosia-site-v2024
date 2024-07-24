import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { Alert } from "@client/components/alert/Alert";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicForm } from "@client/components/forms/BasicForm";
import { reverse, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.Login) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Login</PageTitle>
      <CenteredFormContainer>
        {props.is_redirected_from_another_page && (
          <Alert type="warning">
            Please login to see this page.
            <br />
            If you don&apos;t have an account yet,{" "}
            <a href={reverse("accounts_signup")} className="link">
              sign up
            </a>{" "}
            first.
          </Alert>
        )}
        <BasicForm form={form} submitButtonLabel="Login" />
        <a
          href={reverse("password_reset")}
          className="link-hover link block py-4"
        >
          Lost password?
        </a>
      </CenteredFormContainer>
    </Layout>
  );
};
