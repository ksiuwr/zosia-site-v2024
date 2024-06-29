import { getLocalDate } from "@client/utils/time";
import React from "react";
import { EventDates } from "./EventDates";

interface ConferenceInfoProps {
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  registrationStartDate: Date;
  registrationEndDate: Date;

  lectureRegistrationStartDate: Date;
  lectureRegistrationEndDate: Date;

  roomingStartDate: Date;
  roomingEndDate: Date;

  placeName: string;
  placeAddress: string;
  placeUrl: string;
}

export const ConferenceInfo = ({
  conferenceStartDate,
  conferenceEndDate,
  registrationStartDate,
  registrationEndDate,
  lectureRegistrationStartDate,
  lectureRegistrationEndDate,
  roomingStartDate,
  roomingEndDate,
  placeName,
  placeAddress,
  placeUrl,
}: ConferenceInfoProps) => {
  return (
    <div className="bg-neutral text-neutral-content">
      <div className="container mx-auto w-2/3 py-10 lg:w-1/2 2xl:w-1/3">
        <h2 className="mb-8 text-center text-xl font-bold lg:text-4xl">
          {`${getLocalDate(conferenceStartDate)} - ${getLocalDate(conferenceEndDate)}`}
        </h2>
        <div className="flex flex-col justify-between gap-3 text-center text-lg lg:flex-row">
          <div className="flex flex-col gap-3">
            <EventDates
              startDate={registrationStartDate}
              endDate={registrationEndDate}
              title="Registration"
            />
            <EventDates
              startDate={lectureRegistrationStartDate}
              endDate={lectureRegistrationEndDate}
              title="Call for papers"
            />
            <EventDates
              startDate={roomingStartDate}
              endDate={roomingEndDate}
              title="Rooms enrollment"
            />
          </div>
          <div>
            <a
              href={placeUrl}
              target="_blank"
              className="link-hover link font-bold"
              rel="noreferrer"
            >
              {placeName}
            </a>
            <p>{placeAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
