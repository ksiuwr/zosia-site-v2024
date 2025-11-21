import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { getLocalDate } from "@client/utils/time";
import React from "react";
import { EventDates } from "./EventDates";

interface ConferenceInfoProps {
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  registrationStartDate: Date;
  registrationEndDate: Date;

  lectureRegistrationStartDate: Date | null;
  lectureRegistrationEndDate: Date | null;

  roomingStartDate: Date | null;
  roomingEndDate: Date | null;

  placeName: string;
  placeAddress: string;
  placeUrl: string;
  dates_are_tba: boolean;
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
  dates_are_tba,
}: ConferenceInfoProps) => {
  return (
    <div className="bg-neutral text-neutral-content">
      <CenteredContentContainer>
        <div className="py-10">
          <h2 className="mb-8 text-center text-2xl font-bold lg:text-4xl">
            {dates_are_tba
              ? "Dates to be announced soon"
              : `${getLocalDate(conferenceStartDate)} - ${getLocalDate(
                  conferenceEndDate
                )}`}
          </h2>
          <div className="mx-auto flex w-fit flex-col justify-around gap-3 text-center text-lg lg:w-auto lg:flex-row">
            <div className="flex flex-col gap-3">
              <EventDates
                startDate={registrationStartDate}
                endDate={registrationEndDate}
                title="Registration"
                dates_are_tba={dates_are_tba}
              />
              {lectureRegistrationStartDate && lectureRegistrationEndDate && (
                <EventDates
                  startDate={lectureRegistrationStartDate}
                  endDate={lectureRegistrationEndDate}
                  title="Call for papers"
                  dates_are_tba={dates_are_tba}
                />
              )}
              {roomingStartDate && roomingEndDate && (
                <EventDates
                  startDate={roomingStartDate}
                  endDate={roomingEndDate}
                  title="Rooms enrollment"
                  dates_are_tba={dates_are_tba}
                />
              )}
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
              <p className="whitespace-pre-wrap">{placeAddress}</p>
            </div>
          </div>
        </div>
      </CenteredContentContainer>
    </div>
  );
};
