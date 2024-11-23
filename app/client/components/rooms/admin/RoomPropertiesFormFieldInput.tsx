import { Field, Input } from "@headlessui/react";
import React from "react";
import { RoomPropertiesFormFieldLabel } from "./RoomPropertiesFormFieldLabel";

interface RoomPropertiesFormFieldInputProps {
  value: string;
  onChange: (newValue: string) => void;
  type: React.HTMLInputTypeAttribute;
  label: string;
  required?: boolean;
}

export const RoomPropertiesFormFieldInput = ({
  value,
  onChange,
  type,
  label,
  required,
}: RoomPropertiesFormFieldInputProps) => {
  return (
    <Field className="mb-2">
      <RoomPropertiesFormFieldLabel label={label} />
      <Input
        type={type}
        className="input input-bordered w-full"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
};
