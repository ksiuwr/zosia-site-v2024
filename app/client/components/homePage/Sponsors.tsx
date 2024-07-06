import React from "react";
import { CenteredContainer } from "../containers/CenteredContainer";
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
    <CenteredContainer>
      <LogosCard header="Sponsors">
        {sponsorsData.map((sponsor) => (
          <Logo
            name={sponsor.name}
            key={sponsor.name}
            logoPath={sponsor.logoPath}
            url={sponsor.url}
          />
        ))}
      </LogosCard>
    </CenteredContainer>
  );
};
