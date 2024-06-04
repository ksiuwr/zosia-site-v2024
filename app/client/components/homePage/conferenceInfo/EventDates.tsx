import { getLocalDateTime } from "@client/utils/time";
import React, { PropsWithChildren } from "react";

interface EventDatesProps {
  startDate: Date;
  endDate: Date;
  title: string;
}

export const EventDates = ({ startDate, endDate, title }: EventDatesProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <span>{`Start: ${getLocalDateTime(startDate)}`}</span>
      <br />
      <span>{`End: ${getLocalDateTime(endDate)}`}</span>
    </div>
  );
};
