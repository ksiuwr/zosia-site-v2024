import { getLocalDateTime } from "@client/utils/time";
import React from "react";

export interface ProfilePreferencesRegistrationStatusProps {
  registrationOpen: boolean;
  registrationOver: boolean;
  registrationSuspended: boolean;
  registrationStart: Date;
}

export const ProfilePreferencesRegistrationStatus = ({
  registrationOpen,
  registrationOver,
  registrationSuspended,
  registrationStart,
}: ProfilePreferencesRegistrationStatusProps) => {
  if (registrationOver) {
    return <p>Registration has ended - we hope to see you next year :)</p>;
  }
  if (registrationSuspended) {
    return (
      <p>Registration is suspended, please wait for further information.</p>
    );
  }
  if (registrationOpen) {
    return <p>You are not registered - no preferences set.</p>;
  }

  return (
    <p>Registration will open at {getLocalDateTime(registrationStart)}.</p>
  );
};
