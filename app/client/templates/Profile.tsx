import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { ProfilePreferencesSection } from "@client/components/profile/preferences/ProfilePreferencesSection";
import { ProfileAccountSection } from "@client/components/profile/ProfileAccountSection";
import { ProfileNavbar } from "@client/components/profile/ProfileNavbar";
import { ProfilePaymentSection } from "@client/components/profile/ProfilePaymentSection";

import { templates } from "@reactivated";
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

            {props.zosia && props.preferences && (
              <>
                {/* TODO: Add rooms info here */}
                {/* <div className="divider my-1"></div> */}
              </>
            )}

            {props.zosia && (
              <>
                <ProfilePreferencesSection
                  preferences={{
                    vegetarian: props.preferences?.vegetarian || false,
                    shirtType: props.shirt_type,
                    shirtSize: props.shirt_size,
                    transport: props.preferences?.transport?.name,
                    transportDeparture: props.preferences?.transport
                      ?.departure_time
                      ? new Date(props.preferences?.transport?.departure_time)
                      : undefined,
                    transportBaggage:
                      props.preferences?.transport_baggage || false,
                    organization: props.preferences?.organization?.name,
                    organizationAccepted:
                      props.preferences?.organization?.accepted,
                  }}
                  registrationInfo={{
                    registrationOpen: props.registration_open,
                    registrationOver: props.registration_over,
                    registrationSuspended: props.zosia.registration_suspended,
                    registrationStart: new Date(props.registration_start),
                  }}
                  accomodation={{
                    accomodation: [
                      ["Day 1 - dinner", props.preferences?.dinner_day_1],
                      [
                        "Day 1 - accomodation",
                        props.preferences?.accommodation_day_1,
                      ],
                      ["Day 2 - breakfast", props.preferences?.breakfast_day_2],
                      ["Day 2 - dinner", props.preferences?.dinner_day_2],
                      [
                        "Day 2 - accomodation",
                        props.preferences?.accommodation_day_2,
                      ],
                      ["Day 3 - breakfast", props.preferences?.breakfast_day_3],
                      ["Day 3 - dinner", props.preferences?.dinner_day_3],
                      [
                        "Day 3 - accomodation",
                        props.preferences?.accommodation_day_3,
                      ],
                      ["Day 4 - breakfast", props.preferences?.breakfast_day_4],
                    ],
                  }}
                  userRegistered={Boolean(props.preferences)}
                  enableEditingPreferences={props.enable_editing_preferences}
                />
                <div className="divider my-1"></div>
              </>
            )}

            <ProfileAccountSection />
          </div>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
