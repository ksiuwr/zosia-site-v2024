import { Layout } from "@client/components/Layout";
import { About } from "@client/components/homePage/About";
import { GoogleMap } from "@client/components/homePage/GoogleMap";
import { Organizers } from "@client/components/homePage/Organizers";
import { Sponsors } from "@client/components/homePage/Sponsors";
import { Banner } from "@client/components/homePage/banner/Banner";
import { ConferenceInfo } from "@client/components/homePage/conferenceInfo/ConferenceInfo";
import { templates } from "@reactivated";
import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

export const Template = (props: templates.HomePage) => {
  const sponsors = props.sponsors.map((sponsor) => {
    return {
      name: sponsor.name,
      logoPath: sponsor.path_to_logo,
      logoPathDarkMode: sponsor.path_to_logo_dark_mode,
      url: sponsor.url,
    };
  });

  return (
    <Layout>
      {props.zosia ? (
        <Banner
          registrationStatusProps={{
            isRegistrationOpen: props.registration_open,
            registrationStart: new Date(props.zosia.registration_start),
            registrationEnd: new Date(props.zosia.registration_end),
            registrationSuspended: props.zosia.registration_suspended,
          }}
        />
      ) : (
        <Banner />
      )}
      <About />
      {props.zosia && (
        <>
          <ConferenceInfo
            conferenceStartDate={new Date(props.zosia.start_date)}
            conferenceEndDate={new Date(props.zosia_end_date)}
            registrationStartDate={new Date(props.zosia.registration_start)}
            registrationEndDate={new Date(props.zosia.registration_end)}
            lectureRegistrationStartDate={
              props.zosia.lecture_registration_start
                ? new Date(props.zosia.lecture_registration_start)
                : null
            }
            lectureRegistrationEndDate={
              props.zosia.lecture_registration_end
                ? new Date(props.zosia.lecture_registration_end)
                : null
            }
            roomingStartDate={
              props.zosia.rooming_start
                ? new Date(props.zosia.rooming_start)
                : null
            }
            roomingEndDate={
              props.zosia.rooming_end ? new Date(props.zosia.rooming_end) : null
            }
            placeName={props.place.name}
            placeAddress={props.place.address}
            placeUrl={props.place.url}
            dates_are_tba={props.zosia.dates_are_tba}
          />

          <APIProvider apiKey={props.gapi_key}>
            <GoogleMap address={props.place.address} />
          </APIProvider>
        </>
      )}
      <Organizers />
      <Sponsors sponsorsData={sponsors} />
    </Layout>
  );
};
