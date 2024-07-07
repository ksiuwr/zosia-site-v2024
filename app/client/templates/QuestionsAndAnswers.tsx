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
      <div className="mx-auto my-5 w-full 2xl:container">
        {props.questions_and_answers.map((questionWithAnswer) => (
          <div
            key={questionWithAnswer.id}
            className="mx-auto my-3 w-5/6 lg:w-7/12"
          >
            <Disclosure>
              <DisclosureButton className="group btn btn-block flex h-fit flex-col justify-between gap-y-3 py-3 lg:btn-lg lg:flex-row">
                {questionWithAnswer.question}
                <ChevronDownIcon className="inline size-4 stroke-current group-data-[open]:rotate-180 [&>path]:stroke-[2]" />
              </DisclosureButton>
              <DisclosurePanel className="mx-5 my-4">
                {questionWithAnswer.answer}
              </DisclosurePanel>
            </Disclosure>
          </div>
        ))}
      </div>
    </Layout>
  );
};
