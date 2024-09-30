import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse } from "@reactivated";
import React from "react";
import Markdown from "react-markdown";

const emailSentMessageMarkdown = `
We've emailed you instructions for setting your password, 
if an account exists with the email you entered. 
You should receive them shortly.

If you don't receive an email, 
please make sure you've entered the address you registered with, 
and check your spam folder.
`;

export const Template = () => {
  return (
    <Layout>
      <PageTitle>Email sent!</PageTitle>
      <CenteredFormContainer>
        <article className="prose mx-auto mb-4">
          <Markdown>{emailSentMessageMarkdown}</Markdown>
          <a
            className="btn btn-primary btn-lg btn-block mb-6"
            href={reverse("login")}
          >
            Back to login
          </a>
        </article>
      </CenteredFormContainer>
    </Layout>
  );
};
