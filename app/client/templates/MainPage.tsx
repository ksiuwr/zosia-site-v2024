import React from "react";
import { Layout } from "@client/components/Layout";
import { templates } from "@reactivated";
import { Banner } from "@client/components/banner/Banner";

export const Template = (props: templates.MainPage) => {
  return (
    <Layout>
      <Banner
        registration_start={props.zosia.registration_start}
        registration_end={props.zosia.registration_end}
        registration_suspended={props.zosia.registration_suspended}
      />
    </Layout>
  );
};
