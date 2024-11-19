import { AdminCenteredContainer } from "@client/components/admin/layout/AdminCenteredContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { AdminUsersPreferencesBonus } from "@client/components/admin/users/AdminUsersPreferencesBonus";
import { AdminUsersPreferencesImportPayments } from "@client/components/admin/users/AdminUsersPreferencesImportPayments";
import { AdminUsersPreferencesPaymentStatus } from "@client/components/admin/users/AdminUsersPreferencesPaymentStatus";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React, { useState } from "react";

export interface UserPreferences {
  id: number;
  userHash: string;
  userName: string;
  price: number;
  paymentAccepted: boolean;
  bonus: number;
}

export const Template = (props: templates.AdminUsersPreferences) => {
  const [usersPreferences, setUsersPreferences] = useState<UserPreferences[]>(
    props.user_preferences.map((userPreference) => {
      return {
        id: userPreference.id,
        userHash: userPreference.user.hash,
        userName:
          userPreference.user.first_name + " " + userPreference.user.last_name,
        price:
          props.price_for_user.find(
            ({ user_id }) => user_id === userPreference.user.id,
          )?.price || 0,
        paymentAccepted: userPreference.payment_accepted,
        bonus: userPreference.bonus_minutes,
      };
    }),
  );

  const findUserPreferences = (userHash: string) => {
    return usersPreferences.find((userPreferences) =>
      userPreferences.userHash.startsWith(userHash),
    );
  };

  const onPaymentAcceptedChange = (
    userPreferencesId: number,
    newPaymentAccepted: boolean,
  ) => {
    setUsersPreferences((prevUsersPreferences) =>
      prevUsersPreferences.map((userPreferences) => {
        if (userPreferences.id === userPreferencesId) {
          return {
            ...userPreferences,
            paymentAccepted: newPaymentAccepted,
          };
        }
        return userPreferences;
      }),
    );
  };

  const onBonusChange = (userPreferencesId: number, newBonus: number) => {
    setUsersPreferences((prevUsersPreferences) =>
      prevUsersPreferences.map((userPreferences) => {
        if (userPreferences.id === userPreferencesId) {
          return {
            ...userPreferences,
            bonus: newBonus,
          };
        }
        return userPreferences;
      }),
    );
  };

  return (
    <AdminLayout>
      <PageTitle>User Preferences</PageTitle>
      <AdminCenteredContainer>
        <div className="mx-auto w-full overflow-x-auto">
          <AdminUsersPreferencesImportPayments
            findPaymentInfo={findUserPreferences}
            togglePaymentAcceptedCommand={props.toggle_payment_command}
            onPaymentAcceptedChange={onPaymentAcceptedChange}
            changeBonusCommandName={props.change_bonus_command}
            onBonusChange={onBonusChange}
            minBonusMinutes={props.min_bonus_minutes}
            maxBonusMinutes={props.max_bonus_minutes}
            bonusStep={props.bonus_step}
          />

          <div className="divider"></div>

          <table className="table table-zebra table-xs my-6 lg:table-lg lg:table-fixed">
            <thead>
              <tr>
                <th className="whitespace-pre-wrap lg:w-3/12">
                  User name (with hash)
                </th>
                <th className="whitespace-pre-wrap lg:w-1/12">Price</th>
                <th className="whitespace-pre-wrap lg:w-1/12">
                  Payment accepted
                </th>
                <th className="whitespace-pre-wrap lg:w-5/12">Bonus</th>
                <th className="whitespace-pre-wrap lg:w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersPreferences.map((userPreferences) => (
                <tr key={userPreferences.userHash}>
                  <td>
                    {`${userPreferences.userName} (${userPreferences.userHash.slice(0, 7)})`}
                  </td>
                  <td>{userPreferences.price} PLN</td>
                  <td>
                    <AdminUsersPreferencesPaymentStatus
                      userPreferencesId={userPreferences.id}
                      togglePaymentAcceptedCommand={
                        props.toggle_payment_command
                      }
                      paymentAccepted={userPreferences.paymentAccepted}
                      onPaymentAcceptedChange={onPaymentAcceptedChange}
                    />
                  </td>
                  <td>
                    {userPreferences.paymentAccepted && (
                      <AdminUsersPreferencesBonus
                        minBonusMinutes={props.min_bonus_minutes}
                        maxBonusMinutes={props.max_bonus_minutes}
                        bonusStep={props.bonus_step}
                        changeBonusCommand={props.change_bonus_command}
                        userPreferencesId={userPreferences.id}
                        bonusValue={userPreferences.bonus}
                        onBonusChange={onBonusChange}
                      />
                    )}
                  </td>
                  <td>
                    <AdminTableActions>
                      <AdminTableEditLink
                        href={reverse("user_preferences_edit", {
                          pk: userPreferences.id,
                        })}
                      />
                    </AdminTableActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCenteredContainer>
    </AdminLayout>
  );
};
