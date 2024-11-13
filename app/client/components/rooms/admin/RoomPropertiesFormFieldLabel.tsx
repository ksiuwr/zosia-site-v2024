import { Label } from "@headlessui/react";
import React from "react";

interface RoomPropertiesFormFieldLabel {
  label: string;
}

export const RoomPropertiesFormFieldLabel = ({
  label,
}: RoomPropertiesFormFieldLabel) => {
  return (
    <Label className="label inline-block text-wrap text-base font-semibold">
      {`${label}`}
    </Label>
  );
};
