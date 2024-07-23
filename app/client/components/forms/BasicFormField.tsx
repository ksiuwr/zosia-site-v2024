import { Field } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import React from "react";
import { BasicDescription } from "./BasicDescription";
import { BasicLabel } from "./BasicLabel";
import { BasicWidget } from "./BasicWidget";

interface BasicFormFieldProps {
  field: FieldHandler;
  disabled?: boolean;
  checked?: boolean;
  onCheckboxChange?: (field: FieldHandler, value: boolean) => void;
}

export const BasicFormField = ({
  field,
  disabled = undefined,
  checked = undefined,
  onCheckboxChange = undefined,
}: BasicFormFieldProps) => {
  return (
    <Field
      className="mb-4 flex flex-col"
      disabled={disabled === undefined ? field.disabled : disabled}
    >
      <div
        className={`flex ${
          field.tag === "django.forms.widgets.CheckboxInput"
            ? "flex-row items-center gap-x-2"
            : "flex-col"
        }`}
      >
        <BasicLabel field={field} />
        <BasicWidget
          field={field}
          checked={checked}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
      <BasicDescription field={field} />
    </Field>
  );
};
