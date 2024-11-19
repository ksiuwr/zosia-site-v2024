import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AccountActivated) => {
  return (
    <Layout>
      <PageTitle>Email activated!</PageTitle>
      <CenteredContentContainer>
        <div className="prose mx-auto">
          <p>
            Your email has been activated successfully!
            {props.is_conference_active
              ? " You should update preferences for ZOSIA conference."
              : " You may now proceed to the website."}
          </p>
          <a
            className="btn btn-primary btn-lg btn-block mb-6"
            href={
              props.is_conference_active
                ? reverse("user_zosia_register")
                : reverse("index")
            }
          >
            {props.is_conference_active
              ? "Update preferences"
              : "Back to homepage"}
          </a>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
