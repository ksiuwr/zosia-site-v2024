import { FieldHandler } from "@reactivated";
import React, { useState } from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";
import { BasicFormField } from "../forms/BasicFormField";

interface AccomodationFieldGroupProps {
  dinnerField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  accomodationField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  breakfastField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;

  onCostChange: (
    breakfast: boolean,
    dinner: boolean,
    accomodation: boolean,
  ) => void;
}

interface GroupState {
  accomodation: {
    checked: boolean;
  };
  breakfast: {
    disabled: boolean;
    checked: boolean;
  };
  dinner: {
    disabled: boolean;
    checked: boolean;
  };
}

export const AccomodationFieldGroup = ({
  dinnerField,
  accomodationField,
  breakfastField,
  onCostChange,
}: AccomodationFieldGroupProps) => {
  const [groupState, setGroupState] = useState<GroupState>({
    accomodation: {
      checked: accomodationField.value,
    },
    breakfast: {
      disabled: breakfastField.disabled || !accomodationField.value,
      checked: breakfastField.value,
    },
    dinner: {
      disabled: dinnerField.disabled || !accomodationField.value,
      checked: dinnerField.value,
    },
  });

  const onAccomodationChecked = (field: FieldHandler, value: boolean) => {
    const accomodationName = field?.name;
    let groupNewState = groupState;

    switch (accomodationName) {
      case dinnerField.name:
        groupNewState = {
          ...groupState,
          dinner: {
            ...groupState.dinner,
            checked: value,
          },
        };
        break;
      case accomodationField.name:
        groupNewState = {
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
        };
        break;
      case breakfastField.name:
        groupNewState = {
          ...groupState,
          breakfast: {
            ...groupState.breakfast,
            checked: value,
          },
        };
        break;
    }

    setGroupState(groupNewState);
    onCostChange(
      groupNewState.breakfast.checked,
      groupNewState.dinner.checked,
      groupNewState.accomodation.checked,
    );
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
