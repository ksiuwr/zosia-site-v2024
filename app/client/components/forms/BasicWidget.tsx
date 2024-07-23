import { Checkbox, Input, Select, Textarea } from "@headlessui/react";
import { FieldHandler, Widget } from "@reactivated";
import React from "react";

interface BasicWidgetProps {
  field: FieldHandler;
  checked?: boolean;
  onCheckboxChange?: (field: FieldHandler, value: boolean) => void;
}

export const BasicWidget = ({
  field,
  checked = undefined,
  onCheckboxChange = undefined,
}: BasicWidgetProps) => {
  switch (field.tag) {
    case "django.forms.widgets.TextInput":
    case "django.forms.widgets.EmailInput":
    case "django.forms.widgets.PasswordInput":
      return (
        <Input
          type={field.widget.type}
          name={field.name}
          className="input input-bordered w-full"
          required={field.widget.required}
          value={field.value ?? ""}
          onChange={(e) => field.handler(e.target.value)}
        />
      );

    case "django.forms.widgets.CheckboxInput":
      return (
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

    case "django.forms.widgets.Textarea":
      return (
        <Textarea
          name={field.name}
          className="textarea textarea-bordered w-full"
          required={field.widget.required}
          value={field.value ?? ""}
          onChange={(e) => field.handler(e.target.value)}
        />
      );

    case "django.forms.widgets.Select":
      return (
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
    default:
      return <Widget field={field} />;
  }
};
