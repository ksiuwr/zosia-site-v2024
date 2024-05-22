import React from "react";
import { Layout } from "@client/components/Layout";
import { templates } from "@reactivated";

export const Template = (props: templates.MainPage) => {
  return (
    <Layout title="Hello world">
      <h1 className="bg-green-300 text-xl font-bold text-red-400">
        Hello world
      </h1>
      <p>
        This is the main page. Zosia start date: {props.zosia.start_date}; URL:{" "}
        {props.zosia_url} Registration open:{" "}
        {props.registration_open.toString()}
      </p>
    </Layout>
  );
};
