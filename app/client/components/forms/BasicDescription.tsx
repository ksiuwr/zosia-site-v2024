import { Description } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import parse from "html-react-parser";
import React from "react";

interface BasicDescriptionProps {
  field: FieldHandler;
}

export const BasicDescription = ({ field }: BasicDescriptionProps) => {
  if (!field.help_text && !field.error) {
    return <></>;
  }

  return (
    <Description as="div" className="prose mx-2 max-w-none">
      {field.error && (
        <span className="block text-error">{parse(field.error)}</span>
      )}
      {field.help_text && (
        <span className="block">{parse(field.help_text)}</span>
      )}
    </Description>
  );
};
