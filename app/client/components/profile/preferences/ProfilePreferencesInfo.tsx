import { getLocalTime } from "@client/utils/time";
import React from "react";
import Markdown from "react-markdown";

export interface ProfilePreferencesInfoProps {
  vegetarian: boolean;
  shirtType: string;
  shirtSize: string;
  transport?: string;
  transportDeparture?: Date;
  transportBaggage: boolean;
  organization?: string;
  organizationAccepted?: boolean;
}

const preferencesInfoMarkdown = ({
  vegetarian,
  shirtType,
  shirtSize,
  transport,
  transportDeparture,
  transportBaggage,
  organization,
  organizationAccepted,
}: ProfilePreferencesInfoProps) => {
  let organizationDisplay =
    organization || "You haven't selected any organization";
  if (organization && !organizationAccepted) {
    organizationDisplay += " (not accepted yet)";
  }

  let transportDisplay =
    transport || "You haven't selected any form of transport";
  if (transportDeparture) {
    transportDisplay += ` (${getLocalTime(transportDeparture)})`;
  }

  return `
Organization: **${organizationDisplay}**
Transport: **${transportDisplay}**
Transport baggage: **${transportBaggage ? "Yes" : "No"}**
Vegetarian: **${vegetarian ? "Yes" : "No"}**
T-shirt: **${shirtType} ${shirtSize}**
`;
};

export const ProfilePreferencesInfo = (props: ProfilePreferencesInfoProps) => {
  return (
    <div className="prose whitespace-pre-wrap">
      <Markdown>{preferencesInfoMarkdown(props)}</Markdown>
    </div>
  );
};
