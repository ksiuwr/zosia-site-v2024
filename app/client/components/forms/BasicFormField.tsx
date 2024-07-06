import { Field, Input, Label } from "@headlessui/react";
import { FieldHandler, Widget } from "@reactivated";
import React from "react";

interface BasicFormFieldProps {
  field: FieldHandler;
}

export const BasicFormField = ({ field }: BasicFormFieldProps) => {
  let widget;

  switch (field.tag) {
    case "django.forms.widgets.TextInput":
      widget = (
        <Input
          type="text"
          name={field.name}
          className="input input-bordered w-full"
          required
          disabled={field.disabled}
        />
      );
      break;
    case "django.forms.widgets.PasswordInput":
      widget = (
        <Input
          type="password"
          name={field.name}
          className="input input-bordered w-full"
          required
          disabled={field.disabled}
        />
      );
      break;
    default:
      widget = <Widget field={field} />;
  }

  return (
    <Field className="mb-3">
      <Label className="label font-semibold">{field.label}</Label>
      {widget}
    </Field>
  );
};
