import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { showCustomToast } from "@client/components/CustomToast";
import { BasicForm } from "@client/components/forms/BasicForm";
import { PageTitle } from "@client/components/PageTitle";
import {
  scheduleDataExample,
  validateScheduleJson,
} from "@client/utils/scheduleData";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminScheduleUpdate) => {
  const form = useForm({ form: props.form });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const jsonString = form.values.schedule_data;
    if (!jsonString) {
      e.preventDefault();
      return;
    }

    let parsedData = {};
    try {
      parsedData = JSON.parse(jsonString);
    } catch (error) {
      e.preventDefault();
      showCustomToast("error", "Invalid JSON syntax");
      console.error(error);
    }

    const isValid = validateScheduleJson(parsedData);
    if (!isValid) {
      e.preventDefault();
      showCustomToast(
        "error",
        `Invalid JSON - ${validateScheduleJson.errors?.map((e) => `${e.keyword} ${e.message}. Schema path: ${e.schemaPath}`).join(", ")}`,
      );
      console.error(validateScheduleJson.errors);
    }
  };

  return (
    <AdminLayout>
      <PageTitle>Update schedule</PageTitle>
      <AdminCenteredFormContainer>
        <div className="prose mx-auto max-w-none">
          <p>
            Update the schedule below by pasting a <strong>json object</strong>{" "}
            generated with the{" "}
            <a href="https://github.com/ksiuwr/zosia_print">zosia_print</a>{" "}
            script.
          </p>
          <p>It expects the following structure:</p>
          <pre>{JSON.stringify(scheduleDataExample, null, 2)}</pre>
        </div>
        <BasicForm
          form={form}
          submitButtonLabel="Update"
          onFormSubmit={onFormSubmit}
        ></BasicForm>

        <div className="prose mx-auto max-w-none"></div>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
