import React, { useContext } from "react";
import { Layout } from "@client/components/Layout";
import { templates, Context } from "@reactivated";
import { Banner } from "@client/components/landingPage/banner/Banner";
import { About } from "@client/components/landingPage/About";
import { ConferenceInfo } from "@client/components/landingPage/conferenceInfo/ConferenceInfo";

export const Template = (props: templates.MainPage) => {
  const context = useContext(Context);

  return (
    <Layout>
      <Banner
        isRegistrationOpen={props.registration_open}
        registration_start={props.zosia.registration_start}
        registration_end={props.zosia.registration_end}
        registration_suspended={props.zosia.registration_suspended}
      />
      <About />
      <ConferenceInfo
        conferenceStartDate={new Date(props.zosia.start_date)}
        conferenceEndDate={new Date(props.zosia_end_date)}
        registrationStartDate={new Date(props.zosia.registration_start)}
        registrationEndDate={new Date(props.zosia.registration_end)}
        lectureRegistrationStartDate={
          new Date(props.zosia.lecture_registration_start)
        }
        lectureRegistrationEndDate={
          new Date(props.zosia.lecture_registration_end)
        }
        roomingStartDate={new Date(props.zosia.rooming_start)}
        roomingEndDate={new Date(props.zosia.rooming_end)}
        placeName={props.place.name}
        placeAddress={props.place.address}
        placeUrl={props.place.url}
      />
    </Layout>
  );
};
