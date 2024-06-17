import { Context } from "@reactivated";
import React, { useContext } from "react";
import {
  RegistrationStatus,
  RegistrationStatusProps,
} from "./RegistrationStatus";

interface BannerProps {
  registrationStatusProps?: RegistrationStatusProps;
}

export const Banner = ({
  registrationStatusProps: registrationStatus,
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
          {registrationStatus && <RegistrationStatus {...registrationStatus} />}
        </div>
      </div>
    </div>
  );
};
