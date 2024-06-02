import React, { useContext } from "react";
import { Layout } from "@client/components/Layout";
import { templates, Context } from "@reactivated";
import { Banner } from "@client/components/landingPage/banner/Banner";
import { About } from "@client/components/landingPage/About";

export const Template = (props: templates.MainPage) => {
  const context = useContext(Context);

  return (
    <Layout>
      <Banner
        registration_start={props.zosia.registration_start}
        registration_end={props.zosia.registration_end}
        registration_suspended={props.zosia.registration_suspended}
      />
      <About />
    </Layout>
  );
};
