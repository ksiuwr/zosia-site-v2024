import { getLocalDateTime } from "@client/utils/time";
import React from "react";

interface EventDatesProps {
  startDate: Date;
  endDate: Date;
  title: string;
}

export const EventDates = ({ startDate, endDate, title }: EventDatesProps) => {
  return (
    <div className="mx-auto text-start">
      <h3 className="text-center">{`${title}:`}</h3>
      <span>{`Start: ${getLocalDateTime(startDate)}`}</span>
      <br />
      <span>{`End: ${getLocalDateTime(endDate)}`}</span>
    </div>
  );
};
