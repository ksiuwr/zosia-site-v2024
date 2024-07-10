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
  disabled?: boolean;
  checked?: boolean;
  onCheckboxChange?: (field: FieldHandler, value: boolean) => void;
}

export const BasicFormField = ({
  field,
  disabled = undefined,
  checked = undefined,
  onCheckboxChange = undefined,
}: BasicFormFieldProps) => {
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
          value={field.value ?? ""}
          onChange={(e) => field.handler(e.target.value)}
        />
      );
      break;
    case "django.forms.widgets.CheckboxInput":
      widget = (
        <Checkbox
          name={field.name}
          className={`checkbox order-first my-2 size-8 data-[checked]:checkbox-success data-[disabled]:cursor-not-allowed data-[disabled]:border-transparent data-[disabled]:bg-base-content/40 data-[disabled]:opacity-20`}
          checked={checked === undefined ? field.value : checked}
          onChange={(checked) => {
            onCheckboxChange === undefined
              ? field.handler(checked)
              : onCheckboxChange(field, checked);
          }}
        />
      );
      break;
    case "django.forms.widgets.Textarea":
      widget = (
        <Textarea
          name={field.name}
          className="textarea textarea-bordered w-full"
          required={field.widget.required}
          value={field.value ?? ""}
          onChange={(e) => field.handler(e.target.value)}
        />
      );
      break;
    case "django.forms.widgets.Select":
      widget = (
        <Select
          name={field.name}
          className="select select-bordered w-full"
          required={field.widget.required}
          value={field.value ?? ""}
          onChange={(e) => field.handler(e.target.value)}
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

  const label = (
    <Label className="label inline-block text-wrap text-base font-semibold">
      {field.label}
      {field.widget.required && <span className="mx-1 text-error">*</span>}
    </Label>
  );

  let widgetWithLabel;

  switch (field.tag) {
    case "django.forms.widgets.CheckboxInput":
      widgetWithLabel = (
        <div className="flex items-center gap-x-2">
          {label}
          {widget}
        </div>
      );
      break;
    default:
      widgetWithLabel = (
        <div className="flex flex-col">
          {label}
          {widget}
        </div>
      );
  }

  return (
    <Field
      className="mb-4 flex flex-col"
      disabled={disabled === undefined ? field.disabled : disabled}
    >
      {widgetWithLabel}
      {description}
    </Field>
  );
};
