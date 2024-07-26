import React, { useEffect, useReducer } from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";
import { BasicFormField } from "../forms/BasicFormField";

interface AccomodationFieldGroupProps {
  dinnerField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  accomodationField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
  breakfastField: WidgetHandler<DjangoFormsWidgetsCheckboxInput>;
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

interface GroupAction {
  fieldName: string;
  newValue: boolean;
}

export const AccomodationFieldGroup = ({
  dinnerField,
  accomodationField,
  breakfastField,
}: AccomodationFieldGroupProps) => {
  const reducer = (state: GroupState, action: GroupAction): GroupState => {
    const { fieldName, newValue } = action;

    switch (fieldName) {
      case dinnerField.name:
        return {
          ...state,
          dinner: {
            ...state.dinner,
            checked: newValue,
          },
        };

      case accomodationField.name:
        return {
          accomodation: {
            checked: newValue,
          },
          breakfast: {
            disabled: !newValue,
            checked: newValue,
          },
          dinner: {
            disabled: !newValue,
            checked: newValue,
          },
        };

      case breakfastField.name:
        return {
          ...state,
          breakfast: {
            ...state.breakfast,
            checked: newValue,
          },
        };
      default:
        return state;
    }
  };

  const [groupState, dispatch] = useReducer(reducer, {
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

  useEffect(() => {
    // Synchronize checkboxes managed by this component
    // with Reactivated's form state, so that the form state
    // is visible in parent component correctly.
    dinnerField.handler(groupState.dinner.checked);
    accomodationField.handler(groupState.accomodation.checked);
    breakfastField.handler(groupState.breakfast.checked);
  }, [groupState]);

  const onCheckboxChange = (
    field: WidgetHandler<DjangoFormsWidgetsCheckboxInput>,
    value: boolean,
  ) => {
    dispatch({ fieldName: field.name, newValue: value });
  };

  return (
    <>
      <BasicFormField
        field={dinnerField}
        disabled={groupState.dinner.disabled}
        checked={groupState.dinner.checked}
        onCheckboxChange={onCheckboxChange}
      />
      <BasicFormField
        field={accomodationField}
        checked={groupState.accomodation.checked}
        onCheckboxChange={onCheckboxChange}
      />
      <BasicFormField
        field={breakfastField}
        disabled={groupState.breakfast.disabled}
        checked={groupState.breakfast.checked}
        onCheckboxChange={onCheckboxChange}
      />
    </>
  );
};
