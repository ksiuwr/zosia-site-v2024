import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { Alert } from "@client/components/alert/Alert";
import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { AccomodationFieldGroup } from "@client/components/register/AccomodationFieldGroup";
import { OrganizationSelector } from "@client/components/register/OrganizationSelector";
import { CostSummary } from "@client/components/register/PriceSummary";
import { reverse, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.Register) => {
  const form = useForm({ form: props.form });

  const pageTitle = props.is_user_already_registered
    ? "Update preferences"
    : "Register";

  const accomodationCheckboxesGroups = [
    {
      dinner: form.fields.dinner_day_1,
      accomodation: form.fields.accommodation_day_1,
      breakfast: form.fields.breakfast_day_2,
    },
    {
      dinner: form.fields.dinner_day_2,
      accomodation: form.fields.accommodation_day_2,
      breakfast: form.fields.breakfast_day_3,
    },
    {
      dinner: form.fields.dinner_day_3,
      accomodation: form.fields.accommodation_day_3,
      breakfast: form.fields.breakfast_day_4,
    },
  ];

  const calculateAccomodationDayCost = (
    breakfast: boolean,
    dinner: boolean,
    accomodation: boolean,
  ) => {
    if (!accomodation && !dinner && !breakfast) {
      return 0;
    }

    if (dinner && breakfast) {
      return props.zosia.price_whole_day;
    }

    if (dinner && !breakfast) {
      return props.zosia.price_accommodation_dinner;
    }

    if (!dinner && breakfast) {
      return props.zosia.price_accommodation_breakfast;
    }

    return props.zosia.price_accommodation;
  };

  const calculateDiscountForGroup = (accomodation: boolean) => {
    return accomodation ? props.discount : 0;
  };

  const accomodationCostPerGroup = accomodationCheckboxesGroups.map(
    ({ dinner, accomodation, breakfast }) =>
      calculateAccomodationDayCost(
        breakfast.value,
        dinner.value,
        accomodation.value,
      ),
  );

  const discountPerGroup = accomodationCheckboxesGroups.map(
    ({ accomodation }) => calculateDiscountForGroup(accomodation.value),
  );

  return (
    <Layout>
      <PageTitle>{pageTitle}</PageTitle>

      <CenteredFormContainer>
        {props.before_discounts ? (
          <Alert type="info">
            <span>
              The first round of funding starts <b>20.12.2024</b>, registering
              before this date, you will not get a discount - see the{" "}
              <a href={reverse("questions_index")} className="link font-bold">
                Q&A
              </a>{" "}
              for more information. At this point, you can still register to get
              bonus time for rooms enrollment.
            </span>
          </Alert>
        ) : (
          <Alert type="info">
            <span>
              The first round of funding started! - see the{" "}
              <a href={reverse("questions_index")} className="link font-bold">
                Q&A
              </a>{" "}
              for more information. 
              <b>If a student chooses to use a discount, they agree to sign a declaration confirming its use.</b>
            </span>
          </Alert>
        )}

        <BasicFormWithCustomFields form={form} submitButtonLabel={pageTitle}>
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

          <OrganizationSelector field={form.fields.organization} />
          <BasicFormField field={form.fields.transport} />
          <BasicFormField field={form.fields.transport_baggage} />

          <div className="divider" />

          {accomodationCheckboxesGroups.map((group) => (
            <AccomodationFieldGroup
              key={group.accomodation.name}
              dinnerField={group.dinner}
              accomodationField={group.accomodation}
              breakfastField={group.breakfast}
            />
          ))}

          <div className="divider" />

          <BasicFormField field={form.fields.contact} />
          <BasicFormField field={form.fields.information} />
          <BasicFormField field={form.fields.vegetarian} />
          <BasicFormField field={form.fields.shirt_size} />
          <BasicFormField field={form.fields.shirt_type} />
          <BasicFormField field={form.fields.terms_accepted} />

          <div className="divider" />

          <CostSummary
            priceAccommodation={props.zosia.price_accommodation}
            priceAccomodationWithBreakfast={
              props.zosia.price_accommodation_breakfast
            }
            priceAccomodationWithDinner={props.zosia.price_accommodation_dinner}
            priceAccomodationWithDinnerAndBreakfast={
              props.zosia.price_whole_day
            }
            priceBase={props.zosia.price_base}
            priceTransport={props.zosia.price_transport}
            priceTransportWithDiscount={
              props.zosia.price_transport_with_discount
            }
            priceTransferBaggage={props.zosia.price_transfer_baggage}
            discountPerDay={props.discount}
            isStudent={form.values.is_student}
            isTransportSelected={form.values.transport !== ""}
            isTransferBaggageSelected={form.values.transport_baggage}
            calculatedAccomodationCost={accomodationCostPerGroup.reduce(
              (prev, current) => prev + current,
              0,
            )}
            calculatedDiscount={
              form.values.is_student
                ? discountPerGroup.reduce((prev, current) => prev + current, 0)
                : 0
            }
          />
        </BasicFormWithCustomFields>
      </CenteredFormContainer>
    </Layout>
  );
};
