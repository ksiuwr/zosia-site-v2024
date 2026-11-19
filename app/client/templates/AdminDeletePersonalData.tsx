import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { Alert } from "@client/components/alert/Alert";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { PageTitle } from "@client/components/PageTitle";
import { useSite } from "@client/utils/site";
import { CSRFToken, reverse, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminDeletePersonalData) => {
  const form = useForm({ form: props.form });
  const site = useSite();

  return (
    <AdminLayout>
      <PageTitle>Delete personal data</PageTitle>
      <AdminCenteredFormContainer>
        <div className="prose mb-6 max-w-none">
          <p>
            According to the{" "}
            <a href={reverse("privacy_policy")}>privacy policy</a> we keep
            participants&apos; personal data until a month after the conference.
            This deletes it from the {site.name} database, other sites are not
            affected.
          </p>
          <h3>Deleted</h3>
          <ul>
            {props.to_delete.map(({ label, count }) => (
              <li key={label}>
                {label}: <strong>{count}</strong>
              </li>
            ))}
          </ul>
          <h3>Kept</h3>
          <p>
            Conferences, places, transport, rooms, sponsors, blog posts, Q&A,
            accepted organizations (without who proposed them) and superuser
            accounts.
          </p>
        </div>
        {props.conference_not_over && (
          <Alert type="error">
            The active conference hasn&apos;t ended yet, this would delete its
            registrations.
          </Alert>
        )}
        <Alert type="warning">
          This cannot be undone. Payment data has to be kept for 5 years, so if
          this site is the only place you have it, download it first. The same
          goes for anything else you want to archive (e.g. lectures).
        </Alert>
        <form method="POST">
          <CSRFToken />
          <BasicFormField field={form.fields.confirmation} />
          <button type="submit" className="btn btn-error btn-lg my-4 w-full">
            Delete personal data
          </button>
        </form>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
