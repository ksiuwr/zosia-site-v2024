import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { BasicReCaptcha } from "@client/components/forms/BasicReCaptcha";
import { templates, useForm } from "@reactivated";
import React from "react";
import Markdown from "react-markdown";

const successfulSignUpMessageMarkdown = (email: string) => `
We've sent an e-mail to **${email}** with instructions for
activating your account. You should receive them shortly.

If you don't receive the e-mail, please make sure you've entered
correct address and/or check your spam folder.

If you experience any problems with signing up, please let us know
at [ksi@cs.uni.wroc.pl](mailto:ksi@cs.uni.wroc.pl).
`;

export const Template = (props: templates.SignUp) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>
        Sign Up {props.is_signup_successful ? "Successful" : ""}
      </PageTitle>
      {props.is_signup_successful ? (
        <CenteredContainer>
          <article className="prose mx-auto">
            <Markdown>
              {successfulSignUpMessageMarkdown(form.fields.email.value ?? "")}
            </Markdown>
          </article>
        </CenteredContainer>
      ) : (
        <CenteredFormContainer>
          <BasicFormWithCustomFields form={form} submitButtonLabel="Sign up">
            <BasicFormField field={form.fields.first_name} />
            <BasicFormField field={form.fields.last_name} />
            <BasicFormField field={form.fields.email} />
            <BasicFormField field={form.fields.password1} />
            <BasicFormField field={form.fields.password2} />
            <BasicFormField field={form.fields.privacy_consent} />
            <BasicReCaptcha />
          </BasicFormWithCustomFields>
        </CenteredFormContainer>
      )}
    </Layout>
  );
};
