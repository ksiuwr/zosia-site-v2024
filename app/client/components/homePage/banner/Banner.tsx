import { Context } from "@reactivated";
import React, { useContext } from "react";
import { RegistrationStatus } from "./RegistrationStatus";

interface BannerProps {
  registrationStart: string;
  registrationEnd: string;
  registrationSuspended: boolean;
  isRegistrationOpen: boolean;
}

export const Banner = ({
  registrationStart,
  registrationEnd,
  registrationSuspended,
  isRegistrationOpen,
}: BannerProps) => {
  const context = useContext(Context);

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
          <h1 className="mb-10 text-5xl font-bold lg:text-6xl">
            Zimowy Obóz Studentów Informatyki A
          </h1>
          <RegistrationStatus
            registrationStart={new Date(registrationStart)}
            registrationEnd={new Date(registrationEnd)}
            isRegistrationOpen={isRegistrationOpen}
            registrationSuspended={registrationSuspended}
            currentServerTime={new Date(context.server_time)}
          />
        </div>
      </div>
    </div>
  );
};
