import React from "react";
import { Logo } from "./logos/Logo";
import { LogosCard } from "./logos/LogosCard";

interface SponsorData {
  name: string;
  logoPath: string | null;
  url: string;
}

interface SponsorsProps {
  sponsorsData: SponsorData[];
}

export const Sponsors = ({ sponsorsData }: SponsorsProps) => {
  return (
    <LogosCard header="Sponsors">
      {sponsorsData.map((sponsor) => (
        <Logo
          name={sponsor.name}
          logoPath={sponsor.logoPath}
          url={sponsor.url}
        />
      ))}
    </LogosCard>
  );
};
