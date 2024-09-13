import { AdminCenteredContainer } from "@client/components/admin/layout/AdminCenteredContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminUsersPreferencesBonus } from "@client/components/admin/users/AdminUsersPreferencesBonus";
import { AdminUsersPreferencesPaymentStatus } from "@client/components/admin/users/AdminUsersPreferencesPaymentStatus";
import { PageTitle } from "@client/components/PageTitle";
import { PencilIcon } from "@heroicons/react/24/outline";
import { reverse, templates } from "@reactivated";
import React, { useState } from "react";

interface UserPreferences {
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

  const onPaymentAcceptedChange = (
    userPreferencesId: number,
    newPaymentAccepted: boolean,
  ) => {
    setUsersPreferences((prevUsersPreferences) =>
      prevUsersPreferences.map((userPreference) => {
        if (userPreference.id === userPreferencesId) {
          return {
            ...userPreference,
            paymentAccepted: newPaymentAccepted,
          };
        }
        return userPreference;
      }),
    );
  };

  const onBonusChange = (userPreferencesId: number, newBonus: number) => {
    setUsersPreferences((prevUsersPreferences) =>
      prevUsersPreferences.map((userPreference) => {
        if (userPreference.id === userPreferencesId) {
          return {
            ...userPreference,
            bonus: newBonus,
          };
        }
        return userPreference;
      }),
    );
  };

  return (
    <AdminLayout>
      <PageTitle>User Preferences</PageTitle>
      <AdminCenteredContainer>
        <div className="mx-auto w-full overflow-x-auto">
          <table className="table table-zebra table-xs my-6 lg:table-lg lg:table-fixed">
            <thead>
              <tr>
                <th className="whitespace-pre-wrap lg:w-1/12">User hash</th>
                <th className="whitespace-pre-wrap lg:w-2/12">User name</th>
                <th className="whitespace-pre-wrap lg:w-1/12">Price</th>
                <th className="whitespace-pre-wrap lg:w-1/12">
                  Payment accepted
                </th>
                <th className="whitespace-pre-wrap lg:w-7/12">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {usersPreferences.map((userPreferences) => (
                <tr key={userPreferences.userHash}>
                  <td>{userPreferences.userHash.slice(0, 7)}</td>
                  <td>
                    <a
                      className="link link-primary"
                      href={reverse("user_preferences_edit", {
                        pk: userPreferences.id,
                      })}
                    >
                      <PencilIcon className="mr-1 inline size-4" />
                      {userPreferences.userName}
                    </a>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCenteredContainer>
    </AdminLayout>
  );
};
