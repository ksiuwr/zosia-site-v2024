import { Alert } from "@client/components/alert/Alert";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
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

            <h2 className="card-title text-lg lg:text-xl">Account</h2>
            <p>
              <span className="font-bold">Name:</span> {user.first_name}{" "}
              {user.last_name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>

            {user.is_staff && (
              <Alert type="warning">
                Your account has admin access! Check out the{" "}
                <a className="link" href={reverse("admin")}>
                  admin panel
                </a>
                .
              </Alert>
            )}
            <a className="btn btn-outline" href={reverse("accounts_edit")}>
              Edit name
            </a>
            <a className="btn btn-outline" href={reverse("password_change")}>
              Change password
            </a>
          </div>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
