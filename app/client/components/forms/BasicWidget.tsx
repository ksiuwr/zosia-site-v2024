import { Input } from "@headlessui/react";
import { FieldHandler, Widget } from "@reactivated";
import React from "react";

interface BasicWidgetProps {
  field: FieldHandler;
}

export const BasicWidget = ({ field }: BasicWidgetProps) => {
  // It's a switch, because there will be more widget types implemented in the future.
  switch (field.tag) {
    case "django.forms.widgets.TextInput":
    case "django.forms.widgets.PasswordInput":
      return (
        <Input
          type={field.widget.type}
          name={field.name}
          className="input input-bordered w-full"
          required={field.widget.required}
          disabled={field.disabled}
        />
      );

    default:
      return <Widget field={field} />;
  }
};
