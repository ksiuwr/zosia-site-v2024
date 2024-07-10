import { FieldHandler } from "@reactivated";
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
  const [groupState, setGroupState] = useState({
    accomodation: {
      checked: accomodationField.value,
    },
    breakfast: {
      disabled: !accomodationField.value,
      checked: breakfastField.value,
    },
    dinner: {
      disabled: !accomodationField.value,
      checked: dinnerField.value,
    },
  });

  const onAccomodationChecked = (field: FieldHandler, value: boolean) => {
    const accomodationName = field?.name;

    switch (accomodationName) {
      case dinnerField.name:
        setGroupState((prevState) => {
          return {
            ...prevState,
            dinner: {
              ...prevState.dinner,
              checked: value,
            },
          };
        });
        break;
      case accomodationField.name:
        setGroupState({
          accomodation: {
            checked: value,
          },
          breakfast: {
            disabled: !value,
            checked: value,
          },
          dinner: {
            disabled: !value,
            checked: value,
          },
        });
        break;
      case breakfastField.name:
        setGroupState((prevState) => {
          return {
            ...prevState,
            breakfast: {
              ...prevState.breakfast,
              checked: value,
            },
          };
        });
        break;
    }
  };

  return (
    <>
      <BasicFormField
        field={dinnerField}
        disabled={groupState.dinner.disabled}
        checked={groupState.dinner.checked}
        onCheckboxChange={onAccomodationChecked}
      />
      <BasicFormField
        field={accomodationField}
        checked={groupState.accomodation.checked}
        onCheckboxChange={onAccomodationChecked}
      />
      <BasicFormField
        field={breakfastField}
        disabled={groupState.breakfast.disabled}
        checked={groupState.breakfast.checked}
        onCheckboxChange={onAccomodationChecked}
      />
    </>
  );
};
