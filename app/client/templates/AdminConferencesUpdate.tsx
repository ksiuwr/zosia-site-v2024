import { AdminCenteredFormContainer } from "@client/components/admin/layout/AdminCenteredFormContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { showCustomToast } from "@client/components/CustomToast";
import { BasicDescription } from "@client/components/forms/BasicDescription";
import { BasicFormField } from "@client/components/forms/BasicFormField";
import { BasicFormWithCustomFields } from "@client/components/forms/BasicFormWithCustomFields";
import { BasicWidget } from "@client/components/forms/BasicWidget";
import { PageTitle } from "@client/components/PageTitle";
import { getConferenceStayPriceCombinations } from "@client/utils/payment";
import { Field, Label } from "@headlessui/react";
import { FieldHandler, templates, useForm } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminConferencesUpdate) => {
  const form = useForm({ form: props.form });

  const pageTitle = props.edit_mode ? "Update conference" : "Add conference";

  const asNumber = (value: unknown) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const stayPriceCombinations = getConferenceStayPriceCombinations({
    priceBase: asNumber(form.values.price_base),
    priceAccommodation: asNumber(form.values.price_accommodation),
    priceAccommodationBreakfast: asNumber(
      form.values.price_accommodation_breakfast,
    ),
    priceAccommodationDinner: asNumber(form.values.price_accommodation_dinner),
    priceWholeDay: asNumber(form.values.price_whole_day),
    discounts: [
      asNumber(form.values.first_discount),
      asNumber(form.values.second_discount),
      asNumber(form.values.third_discount),
    ],
  });

  const hasNegativeStayPrice = stayPriceCombinations.some(
    ({ total }) => total < 0,
  );

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!hasNegativeStayPrice) {
      return;
    }

    event.preventDefault();
    showCustomToast(
      "error",
      "Possible stay prices contain a negative total price.",
    );
  };

  const discountFields = new Set([
    form.fields.first_discount.name,
    form.fields.second_discount.name,
    form.fields.third_discount.name,
  ]);

  const renderDiscountField = (field: FieldHandler, label: string) => (
    <Field
      className="mb-4 flex flex-col"
      disabled={field.disabled}
      key={field.name}
    >
      <Label className="label inline-block text-wrap text-base font-semibold">
        {label} discount <span className="font-bold text-error">PER DAY</span>
        {field.widget.required && <span className="mx-1 text-error">*</span>}
      </Label>
      <BasicWidget field={field} />
      <BasicDescription field={field} />
    </Field>
  );

  return (
    <AdminLayout>
      <PageTitle>{pageTitle}</PageTitle>
      <AdminCenteredFormContainer>
        <BasicFormWithCustomFields
          form={form}
          submitButtonLabel={pageTitle}
          onFormSubmit={onFormSubmit}
        >
          {form.visibleFields.map((field) => {
            if (discountFields.has(field.name)) {
              return null;
            }

            return (
              <BasicFormField
                key={field.name}
                field={field as unknown as FieldHandler}
              />
            );
          })}
          {renderDiscountField(
            form.fields.first_discount as unknown as FieldHandler,
            "First",
          )}
          {renderDiscountField(
            form.fields.second_discount as unknown as FieldHandler,
            "Second",
          )}
          {renderDiscountField(
            form.fields.third_discount as unknown as FieldHandler,
            "Third",
          )}
        </BasicFormWithCustomFields>
        <section className="mt-8 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold">Possible stay prices</h2>
          {hasNegativeStayPrice && (
            <p className="mb-4 font-semibold text-error">
              Some possible stay prices are negative. Fix prices or discounts
              before saving.
            </p>
          )}
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Nights</th>
                <th>Meals</th>
                <th>Attendee</th>
                <th>Total price</th>
              </tr>
            </thead>
            <tbody>
              {stayPriceCombinations.map((combination) => (
                <tr
                  key={`${combination.nights}-${combination.meals}-${combination.attendee}`}
                >
                  <td>{combination.nights}</td>
                  <td>{combination.meals}</td>
                  <td>{combination.attendee}</td>
                  <td>
                    <b
                      className={
                        combination.total < 0 ? "text-error" : undefined
                      }
                    >
                      {combination.total} PLN
                    </b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </AdminCenteredFormContainer>
    </AdminLayout>
  );
};
