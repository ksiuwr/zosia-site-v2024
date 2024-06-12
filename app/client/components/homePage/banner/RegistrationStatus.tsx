import React, { useState } from "react";
import { reverse } from "@reactivated";
import { Countdown } from "./Countdown";

interface RegistrationStatusProps {
  registrationStart: Date;
  registrationEnd: Date;
  registrationSuspended: boolean;
  isRegistrationOpen: boolean;
  currentServerTime: Date;
}

export const RegistrationStatus = ({
  registrationStart,
  registrationEnd,
  registrationSuspended,
  isRegistrationOpen,
  currentServerTime,
}: RegistrationStatusProps) => {
  const [countDownFinished, setCountdownFinished] = useState(false);

  const onCountdownFinish = () => {
    setCountdownFinished(true);
  };

  const isRegistrationOver = currentServerTime > registrationEnd;

  if (isRegistrationOver) {
    return (
      <h2 className="text-3xl font-bold text-error">Registration closed</h2>
    );
  } else if (registrationSuspended) {
    return (
      <h2 className="text-3xl font-bold text-warning">
        Registration is suspended, please wait for further information
      </h2>
    );
  } else if (isRegistrationOpen || countDownFinished) {
    // If countdown has finished, show the registration button immediately, even if user didn't refresh the page
    return (
      <a
        className="btn btn-primary btn-lg btn-wide text-3xl"
        href={reverse("user_zosia_register")}
      >
        Register now
      </a>
    );
  } else {
    return (
      <>
        <h2 className="mb-6 text-3xl font-bold">Registration starts in</h2>
        <Countdown
          endDate={registrationStart}
          onCountdownFinish={onCountdownFinish}
        />
      </>
    );
  }
};
