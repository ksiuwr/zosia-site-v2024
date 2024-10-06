import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableDeleteLink } from "@client/components/admin/tables/AdminTableDeleteLink";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { AdminTablePopover } from "@client/components/admin/tables/AdminTablePopover";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminQuestionsList) => {
  return (
    <AdminLayout>
      <PageTitle>Questions and Answers</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable headerNames={["Question", "Priority", "Actions"]}>
          {props.questions.map((question) => (
            <tr key={question.id}>
              <td>
                <AdminTablePopover
                  buttonLabel={question.question}
                  panelContent={[
                    { header: "Question:", description: question.question },
                    { header: "Answer:", description: question.answer },
                  ]}
                />
              </td>
              <td>{question.priority}</td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("questions_edit", {
                      question_id: question.id,
                    })}
                  />
                  <AdminTableDeleteLink
                    href={reverse("questions_delete", {
                      question_id: question.id,
                    })}
                  />
                </AdminTableActions>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
