import React, { useContext, useState } from "react";
import { Context, reverse } from "@reactivated";
import { Countdown } from "./Countdown";

interface BannerProps {
  registration_start: string;
  registration_end: string;
  registration_suspended: boolean;
  isRegistrationOpen: boolean;
}

export const Banner = ({
  registration_start,
  registration_end,
  registration_suspended,
  isRegistrationOpen,
}: BannerProps) => {
  const context = useContext(Context);
  const [countDownFinished, setCountdownFinished] = useState(false);

  const onCountdownFinish = () => {
    setCountdownFinished(true);
  };

  const registrationStartDate = new Date(registration_start);
  const registrationEndDate = new Date(registration_end);
  const currentServerTime = new Date(context.server_time);

  const isRegistrationOver = currentServerTime > registrationEndDate;

  let registrationStatus = <></>;

  if (isRegistrationOver) {
    registrationStatus = (
      <h2 className="text-3xl font-bold text-error">Registration closed</h2>
    );
  } else if (registration_suspended) {
    registrationStatus = (
      <h2 className="text-3xl font-bold text-warning">
        Registration is suspended, please wait for further information
      </h2>
    );
  } else if (isRegistrationOpen || countDownFinished) {
    // If countdown has finished, show the registration button immediately, even if user didn't refresh the page
    registrationStatus = (
      <a
        className="btn btn-primary btn-lg btn-wide text-3xl"
        href={reverse("user_zosia_register")}
      >
        Register now
      </a>
    );
  } else {
    registrationStatus = (
      <>
        <h2 className="mb-6 text-3xl font-bold">Registration starts in</h2>
        <Countdown
          endDate={registrationStartDate}
          onCountdownFinish={onCountdownFinish}
        />
      </>
    );
  }

  return (
    <div
      className="hero h-[500px] bg-fixed"
      style={{
        backgroundImage: `url(${context.STATIC_URL}imgs/blur-bg-4496x1986.jpg)`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div>
          <h1 className="mb-10 text-8xl font-bold">
            Zimowy Obóz Studentów Informatyki A
          </h1>
          {registrationStatus}
        </div>
      </div>
    </div>
  );
};
