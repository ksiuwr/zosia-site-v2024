import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse } from "@reactivated";
import React from "react";

export const Template = () => {
  return (
    <Layout>
      <PageTitle>Password changed successfully!</PageTitle>
      <CenteredContentContainer>
        <a
          className="btn btn-primary btn-lg btn-block mb-6"
          href={reverse("accounts_profile")}
        >
          Back to profile
        </a>
      </CenteredContentContainer>
    </Layout>
  );
};
