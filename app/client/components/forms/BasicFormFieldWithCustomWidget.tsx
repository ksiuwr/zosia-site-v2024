import { Field } from "@headlessui/react";
import { FieldHandler } from "@reactivated";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { BasicDescription } from "./BasicDescription";
import { BasicLabel } from "./BasicLabel";

interface BasicFormFieldWithCustomWidgetProps {
  field: FieldHandler;
  disabled?: boolean;
}

export const BasicFormFieldWithCustomWidget = ({
  field,
  disabled = undefined,
  children,
}: PropsWithChildren<BasicFormFieldWithCustomWidgetProps>) => {
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
        {children}
      </div>
      <BasicDescription field={field} />
    </Field>
  );
};
