import { Label } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import React from "react";

interface BasicLabelProps {
  field: FieldHandler;
}

export const BasicLabel = ({ field }: BasicLabelProps) => {
  return (
    <Label className="label inline-block text-wrap text-base font-semibold">
      {field.label}
      {field.widget.required && <span className="mx-1 text-error">*</span>}
    </Label>
  );
};
