import {
  Checkbox,
  Description,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@headlessui/react";
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
          defaultValue={field.value ?? ""}
        />
      );
      break;
    case "django.forms.widgets.CheckboxInput":
      widget = (
        <Checkbox
          name={field.name}
          className={`checkbox order-first my-2 size-8 data-[checked]:checkbox-success data-[disabled]:cursor-not-allowed data-[disabled]:border-transparent data-[disabled]:bg-base-content/40 data-[disabled]:opacity-20`}
          defaultChecked={field.value ?? false}
        />
      );
      break;
    case "django.forms.widgets.Textarea":
      widget = (
        <Textarea
          name={field.name}
          className="textarea textarea-bordered w-full"
          required={field.widget.required}
          defaultValue={field.value ?? ""}
        />
      );
      break;
    case "django.forms.widgets.Select":
      widget = (
        <Select
          name={field.name}
          className="select select-bordered w-full"
          required={field.widget.required}
          defaultValue={field.value ?? ""}
        >
          {field.widget.optgroups.map((optgroup) => {
            const currentOption = optgroup[1][0];
            const optgroupValue = (currentOption.value ?? "").toString();

            return (
              <option key={optgroupValue} value={optgroupValue}>
                {currentOption.label}
              </option>
            );
          })}
        </Select>
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
    <Field className="mb-4 flex flex-col" disabled={field.disabled}>
      <div className="flex flex-wrap items-center gap-x-2">
        <Label className="label inline-block text-base font-semibold">
          {field.label}
          {field.widget.required && <span className="mx-1 text-error">*</span>}
        </Label>
        {widget}
      </div>
      {description}
    </Field>
  );
};
