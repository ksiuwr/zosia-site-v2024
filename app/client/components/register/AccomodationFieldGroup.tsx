import React, { useState } from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";
import { BasicFormField } from "../forms/BasicFormField";

interface AccomodationFieldGroupProps {
  dinnerField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  accomodationField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  breakfastField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
}

export const AccomodationFieldGroup = ({
  dinnerField,
  accomodationField,
  breakfastField,
}: AccomodationFieldGroupProps) => {
  const [breakfastDisabled, setBreakfastDisabled] = useState(
    breakfastField.disabled || !accomodationField.value,
  );

  const [dinnerDisabled, setDinnerDisabled] = useState(
    dinnerField.disabled || !accomodationField.value,
  );

  const onAccomodationChange = (
    field: WidgetHandler<DjangoFormsWidgetsCheckboxInput>,
    value: boolean,
  ) => {
    dinnerField.handler(value);
    setDinnerDisabled(!value);

    breakfastField.handler(value);
    setBreakfastDisabled(!value);

    field.handler(value);
  };

  return (
    <>
      <BasicFormField field={dinnerField} disabled={dinnerDisabled} />
      <BasicFormField
        field={accomodationField}
        onCheckboxChange={onAccomodationChange}
      />
      <BasicFormField field={breakfastField} disabled={breakfastDisabled} />
    </>
  );
};
