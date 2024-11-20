import { FieldHandler } from "@reactivated";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";
import { BasicFormFieldWithCustomWidget } from "./BasicFormFieldWithCustomWidget";
import { BasicWidget } from "./BasicWidget";

interface BasicFormFieldProps {
  field: FieldHandler;
  disabled?: boolean;
  checked?: boolean;
  onCheckboxChange?: (
    field: WidgetHandler<DjangoFormsWidgetsCheckboxInput>,
    value: boolean,
  ) => void;
}

export const BasicFormField = ({
  field,
  disabled = undefined,
  checked = undefined,
  onCheckboxChange = undefined,
}: BasicFormFieldProps) => {
  return (
    <BasicFormFieldWithCustomWidget field={field} disabled={disabled}>
      <BasicWidget
        field={field}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
      />
    </BasicFormFieldWithCustomWidget>
  );
};
