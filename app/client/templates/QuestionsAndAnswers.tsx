import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.QuestionsAndAnswers) => {
  return (
    <Layout>
      <PageTitle>Questions & Answers</PageTitle>
      <CenteredContentContainer>
        <div className="my-5 w-full">
          {props.questions_and_answers.map((questionWithAnswer) => (
            <div key={questionWithAnswer.id} className="mx-auto my-3 w-full">
              <Disclosure>
                <DisclosureButton className="group btn btn-block flex h-fit flex-nowrap justify-between gap-5 py-6 text-start lg:btn-lg">
                  {questionWithAnswer.question}
                  <ChevronDownIcon className="size-4 min-w-4 stroke-current group-data-[open]:rotate-180 [&>path]:stroke-[2]" />
                </DisclosureButton>
                <DisclosurePanel className="mx-5 my-4">
                  {questionWithAnswer.answer}
                </DisclosurePanel>
              </Disclosure>
            </div>
          ))}
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
