import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse } from "@reactivated";
import React from "react";

export const Template = () => {
  return (
    <Layout>
      <PageTitle>Your password has been changed!</PageTitle>
      <CenteredContentContainer>
        <a
          className="btn btn-primary btn-lg btn-block mb-6"
          href={reverse("login")}
        >
          Back to login
        </a>
      </CenteredContentContainer>
    </Layout>
  );
};
