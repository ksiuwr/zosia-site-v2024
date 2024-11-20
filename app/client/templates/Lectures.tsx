import { Card } from "@client/components/Card";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Lectures) => {
  return (
    <Layout>
      <PageTitle>Lectures</PageTitle>
      {props.lectures.map((lecture) => (
        <Card
          key={lecture.id}
          title={lecture.title}
          content={lecture.abstract}
          authors={
            props.all_authors_names.find(
              (authorWithLecture) =>
                authorWithLecture.lecture_id === lecture.id,
            )?.authors_names ?? ""
          }
          description={lecture.description ?? ""}
        />
      ))}
    </Layout>
  );
};
