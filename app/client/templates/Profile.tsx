import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { ProfileAccountSection } from "@client/components/profile/ProfileAccountSection";
import { ProfileNavbar } from "@client/components/profile/ProfileNavbar";

import { Context, reverse, templates } from "@reactivated";
import React, { useContext } from "react";

export const Template = (props: templates.Profile) => {
  const { user } = useContext(Context);

  return (
    <Layout>
      <CenteredContentContainer>
        <ProfileNavbar />

        <div className="card card-compact mb-8 bg-base-100 lg:card-normal">
          <div className="card-body">
            <h2 className="card-title text-lg lg:text-xl">Payments</h2>
            <p className="whitespace-pre-wrap">Your payments</p>

            <div className="divider my-1"></div>

            <h2 className="card-title text-lg lg:text-xl">Preferences</h2>
            <p className="whitespace-pre-wrap">Your info</p>
            <a
              className="btn btn-outline btn-block"
              href={reverse("user_zosia_register")}
            >
              Update preferences
            </a>

            <div className="divider my-1"></div>

            <ProfileAccountSection />
          </div>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
