import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { CustomDisclosure } from "@client/components/CustomDisclosure";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.QuestionsAndAnswers) => {
  return (
    <Layout>
      <PageTitle>Questions & Answers</PageTitle>
      <CenteredContentContainer>
        <div className="my-5 w-full">
          {props.questions_and_answers.map((questionWithAnswer) => (
            <div
              key={questionWithAnswer.id}
              className="mx-auto my-2 w-full rounded-lg even:bg-base-200"
            >
              <CustomDisclosure
                buttonLabel={questionWithAnswer.question}
                panelContent={questionWithAnswer.answer}
              />
            </div>
          ))}
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
