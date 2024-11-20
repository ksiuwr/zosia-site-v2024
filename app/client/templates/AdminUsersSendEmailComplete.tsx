import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";
import Markdown from "react-markdown";

const emailSentMessageMarkdown = (
  subject: string,
  text: string,
  receivers: string[],
) => `
### Subject: *${subject}*

### Receivers: 

${receivers.join(", ")}

### Text:

${text}
`;

export const Template = (props: templates.AdminUsersSendEmailComplete) => {
  return (
    <AdminLayout>
      <PageTitle>Email sent successfully</PageTitle>
      <AdminCenteredContentContainer>
        <div className="prose mx-auto max-w-none">
          <Markdown>
            {emailSentMessageMarkdown(
              props.subject,
              props.text,
              props.receivers,
            )}
          </Markdown>
        </div>
        <a
          className="btn btn-outline btn-block my-4"
          href={reverse("mail_all")}
        >
          Send another email
        </a>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
