import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { ProfileAccountSection } from "@client/components/profile/ProfileAccountSection";
import { ProfileNavbar } from "@client/components/profile/ProfileNavbar";
import { ProfilePaymentSection } from "@client/components/profile/ProfilePaymentSection";

import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Profile) => {
  return (
    <Layout>
      <CenteredContentContainer>
        <ProfileNavbar />

        <div className="card card-compact mb-8 bg-base-100 lg:card-normal">
          <div className="card-body">
            {props.zosia && props.preferences && (
              <>
                <ProfilePaymentSection
                  paymentAccepted={props.preferences.payment_accepted}
                  price={props.price}
                  transferTitle={props.transfer_title}
                  accountNumber={props.zosia.account_number}
                  accountBank={props.zosia.account_bank}
                  accountOwner={props.zosia.account_owner}
                  accountAddress={props.zosia.account_address}
                  discountRound={props.preferences.discount_round}
                  isStudent={props.preferences.is_student}
                />
                <div className="divider my-1"></div>
              </>
            )}

            <h2 className="card-title text-lg lg:text-xl">Preferences</h2>
            <p className="whitespace-pre-wrap">Your info</p>
            <a
              className="btn btn-outline btn-block"
              href={reverse("user_zosia_register")}
            >
              Update preferences
            </a>

            <div className="divider my-1"></div>

            {props.zosia && props.preferences && (
              <>
                {/* TODO: Add rooms info here */}
                {/* <div className="divider my-1"></div> */}
              </>
            )}

            <ProfileAccountSection />
          </div>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
