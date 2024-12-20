import { Context, reverse } from "@reactivated";
import React, { useContext, useState } from "react";
import { Countdown } from "./Countdown";

export interface RegistrationStatusProps {
  registrationStart: Date;
  registrationEnd: Date;
  registrationSuspended: boolean;
  isRegistrationOpen: boolean;
}

export const RegistrationStatus = ({
  registrationStart,
  registrationEnd,
  registrationSuspended,
  isRegistrationOpen,
}: RegistrationStatusProps) => {
  const context = useContext(Context);
  const [countDownFinished, setCountdownFinished] = useState(false);

  const currentServerTime = new Date(context.server_time);

  const onCountdownFinish = () => {
    setCountdownFinished(true);
  };

  const isRegistrationOver = currentServerTime > registrationEnd;

  if (isRegistrationOver) {
    return (
      <h2 className="text-2xl font-bold text-error lg:text-4xl">
        Registration closed
      </h2>
    );
  } else if (registrationSuspended) {
    return (
      <h2 className="text-2xl font-bold text-warning lg:text-4xl">
        Registration is suspended, please wait for further information
      </h2>
    );
  } else if (isRegistrationOpen || countDownFinished) {
    // If countdown has finished, show the registration button immediately, even if user didn't refresh the page
    return (
      <a
        className="btn btn-primary btn-lg content-center p-8 text-2xl lg:p-10 lg:text-4xl"
        href={reverse("user_zosia_register")}
      >
        Register now
      </a>
    );
  } else {
    return (
      <>
        <h2 className="mb-6 text-2xl font-bold lg:text-4xl">
          Registration starts in
        </h2>
        <Countdown
          endDate={registrationStart}
          onCountdownFinish={onCountdownFinish}
        />
      </>
    );
  }
};
