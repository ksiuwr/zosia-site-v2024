import { Alert } from "@client/components/Alert";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { AccomodationFieldGroup } from "@client/components/register/AccomodationFieldGroup";
import { templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.Register) => {
  const form = useForm({ form: props.form });

  return (
    <Layout>
      <PageTitle>Register</PageTitle>

      <CenteredFormContainer>
        <BasicFormWithCustomFields form={form} submitButtonLabel="Register">
          <BasicFormField field={form.fields.is_student} />
          {form.values.is_student && (
            <div className="mx-6">
              <Alert type="warning">
                <span>
                  {"Be careful. You won't be able to change it later!"}
                </span>
              </Alert>
              <BasicFormField field={form.fields.student_number} />
            </div>
          )}

          <BasicFormField field={form.fields.organization} />
          {/* TODO: Add organization button which should show a modal */}
          <BasicFormField field={form.fields.transport} />
          <BasicFormField field={form.fields.transport_baggage} />

          <div className="divider divider-accent"></div>

          <AccomodationFieldGroup
            dinnerField={form.fields.dinner_day_1}
            accomodationField={form.fields.accommodation_day_1}
            breakfastField={form.fields.breakfast_day_2}
          />

          <AccomodationFieldGroup
            dinnerField={form.fields.dinner_day_2}
            accomodationField={form.fields.accommodation_day_2}
            breakfastField={form.fields.breakfast_day_3}
          />

          <AccomodationFieldGroup
            dinnerField={form.fields.dinner_day_3}
            accomodationField={form.fields.accommodation_day_3}
            breakfastField={form.fields.breakfast_day_4}
          />
        </BasicFormWithCustomFields>
      </CenteredFormContainer>
    </Layout>
  );
};
