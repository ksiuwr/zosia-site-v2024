import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { LectureDurationSelect } from "@client/components/addLecture/LectureDurationSelect";
import { Alert } from "@client/components/alert/Alert";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormFieldWithCustomWidget } from "@client/components/forms/BasicFormFieldWithCustomWidget";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AddLecture) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Add lecture</PageTitle>
      <CenteredFormContainer>
        <Alert type="warning">
          Please remember that lectures/workshops should be accepted by
          organizers before publishing!
        </Alert>

        <BasicFormWithCustomFields form={form} submitButtonLabel="Add lecture">
          <BasicFormField field={form.fields.title} />
          <BasicFormField field={form.fields.abstract} />
          <BasicFormField field={form.fields.lecture_type} />

          <BasicFormFieldWithCustomWidget field={form.fields.duration}>
            <LectureDurationSelect
              field={form.fields.duration}
              lectureType={form.fields.lecture_type.value || ""}
            />
          </BasicFormFieldWithCustomWidget>

          <BasicFormField field={form.fields.supporters_names} />
          <BasicFormField field={form.fields.requests} />
          <BasicFormField field={form.fields.events} />
        </BasicFormWithCustomFields>
      </CenteredFormContainer>
    </Layout>
  );
};
