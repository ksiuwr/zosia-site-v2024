import { Description, Field, Input, Label } from "@headlessui/react";
import { FieldHandler, Widget } from "@reactivated";
import parse from "html-react-parser";
import React from "react";

interface BasicFormFieldProps {
  field: FieldHandler;
}

export const BasicFormField = ({ field }: BasicFormFieldProps) => {
  let widget;

  switch (field.tag) {
    case "django.forms.widgets.TextInput":
    case "django.forms.widgets.EmailInput":
    case "django.forms.widgets.PasswordInput":
      widget = (
        <Input
          type={field.widget.type}
          name={field.name}
          className="input input-bordered w-full"
          required={field.widget.required}
          disabled={field.disabled}
          defaultValue={field.value ?? ""}
        />
      );
      break;
    case "django.forms.widgets.CheckboxInput":
      widget = (
        <input
          type={field.widget.type}
          name={field.name}
          className="checkbox checkbox-lg order-first my-2 checked:checkbox-success"
          required={field.widget.required}
          disabled={field.disabled}
          defaultChecked={field.value ?? false}
        />
      );
      break;
    default:
      widget = <Widget field={field} />;
  }

  const description =
    field.help_text || field.error ? (
      <Description as="div" className="prose mx-2 max-w-none">
        {field.error && (
          <span className="block text-error">{parse(field.error)}</span>
        )}
        {field.help_text && (
          <span className="block">{parse(field.help_text)}</span>
        )}
      </Description>
    ) : (
      <></>
    );

  return (
    <Field className="mb-3 flex flex-wrap items-center gap-x-2">
      <Label className="label inline-block font-semibold">
        {parse(field.label)}
        {field.widget.required && <span className="mx-1 text-error">*</span>}
      </Label>
      {widget}
      {description}
    </Field>
  );
};
