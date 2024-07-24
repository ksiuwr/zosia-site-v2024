import { Field, Label } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import React from "react";
import { BasicWidget } from "./BasicWidget";

interface BasicFormFieldProps {
  field: FieldHandler;
}

export const BasicFormField = ({ field }: BasicFormFieldProps) => {
  return (
    <Field className="mb-3">
      <Label className="label font-semibold">{field.label}</Label>
      <BasicWidget field={field} />
    </Field>
  );
};
