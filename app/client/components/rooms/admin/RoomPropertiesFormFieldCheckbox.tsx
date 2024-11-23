import { Checkbox, Field } from "@headlessui/react";
import React from "react";
import { RoomPropertiesFormFieldLabel } from "./RoomPropertiesFormFieldLabel";

interface RoomPropertiesFormFieldCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

export const RoomPropertiesFormFieldCheckbox = ({
  label,
  checked,
  onChange,
}: RoomPropertiesFormFieldCheckboxProps) => {
  return (
    <Field className="mb-4 flex items-center gap-x-2">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="checkbox my-2 size-8 data-[checked]:checkbox-success"
      />
      <RoomPropertiesFormFieldLabel label={label} />
    </Field>
  );
};
