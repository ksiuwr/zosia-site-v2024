import { Field } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import clsx from "clsx";
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
  const isCheckbox = field.tag === "django.forms.widgets.CheckboxInput";

  return (
    <Field
      className="mb-4 flex flex-col"
      disabled={disabled === undefined ? field.disabled : disabled}
    >
      <div
        className={clsx(
          "flex",
          isCheckbox && "flex-row items-center gap-x-2",
          !isCheckbox && "flex-col",
        )}
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
