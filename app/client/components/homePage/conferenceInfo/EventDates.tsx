import { getLocalDateTime } from "@client/utils/time";
import React from "react";

interface EventDatesProps {
  startDate: Date;
  endDate: Date;
  title: string;
  dates_are_tba: boolean;
}

export const EventDates = ({
  startDate,
  endDate,
  title,
  dates_are_tba,
}: EventDatesProps) => {
  return (
    <div className="mx-auto text-start">
      <h3 className="text-center">{`${title}:`}</h3>
      {dates_are_tba ? (
        <p className="text-center">-</p>
      ) : (
        <>
          <span>{`Start: ${getLocalDateTime(startDate)}`}</span>
          <br />
          <span>{`End: ${getLocalDateTime(endDate)}`}</span>
        </>
      )}
    </div>
  );
};
