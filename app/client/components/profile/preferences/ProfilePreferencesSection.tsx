import { reverse } from "@reactivated";
import clsx from "clsx";
import React from "react";
import {
  ProfilePreferencesAccomodation,
  ProfilePreferencesAccomodationProps,
} from "./ProfilePreferencesAccomodation";
import {
  ProfilePreferencesInfo,
  ProfilePreferencesInfoProps,
} from "./ProfilePreferencesInfo";
import {
  ProfilePreferencesRegistrationStatus,
  ProfilePreferencesRegistrationStatusProps,
} from "./ProfilePreferencesRegistrationStatus";

interface ProfilePreferencesSectionProps {
  registrationInfo: ProfilePreferencesRegistrationStatusProps;
  preferences: ProfilePreferencesInfoProps;
  accomodation: ProfilePreferencesAccomodationProps;

  userRegistered: boolean;
  enableEditingPreferences: boolean;
}

export const ProfilePreferencesSection = ({
  registrationInfo,
  preferences,
  accomodation,

  userRegistered,
  enableEditingPreferences,
}: ProfilePreferencesSectionProps) => {
  return (
    <>
      <h2 className="card-title text-lg lg:text-xl">Preferences</h2>
      {userRegistered ? (
        <>
          <ProfilePreferencesInfo {...preferences} />
          <ProfilePreferencesAccomodation {...accomodation} />
        </>
      ) : (
        <ProfilePreferencesRegistrationStatus {...registrationInfo} />
      )}

      <a
        className={clsx(
          "btn btn-block",
          userRegistered && "btn-outline btn-neutral",
          !userRegistered && "btn-primary",
          !enableEditingPreferences && "btn-disabled",
        )}
        href={reverse("user_zosia_register")}
      >
        {userRegistered ? "Update preferences" : "Register"}
      </a>
    </>
  );
};
