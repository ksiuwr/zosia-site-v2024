import React, { useContext } from "react";
import { Context } from "@reactivated";
import { Logo } from "./logos/Logo";
import { LogosCard } from "./logos/LogosCard";

export const Organizers = () => {
  const context = useContext(Context);

  const organizers = [
    {
      name: "University of Wrocław",
      logoPath: `${context.STATIC_URL}imgs/Logo_UWr.svg`,
      url: "http://uni.wroc.pl",
    },
    {
      name: "Koło Studentów Informatyki",
      logoPath: `${context.STATIC_URL}imgs/Logo_KSI.svg`,
      url: "http://ksi.ii.uni.wroc.pl/",
    },
  ];

  return (
    <div className="bg-base-200 text-base-content">
      <LogosCard header="Organizers">
        {organizers.map((organizer) => (
          <Logo
            name={organizer.name}
            logoPath={organizer.logoPath}
            url={organizer.url}
          />
        ))}
      </LogosCard>
    </div>
  );
};
