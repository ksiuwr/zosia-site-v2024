import { Checkbox, Input, Textarea } from "@headlessui/react";
import { FieldHandler, Widget } from "@reactivated";
import clsx from "clsx";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";
import { BasicListbox } from "./widgets/BasicListbox";

interface BasicWidgetProps {
  field: FieldHandler;
  checked?: boolean;
  onCheckboxChange?: (
    field: WidgetHandler<DjangoFormsWidgetsCheckboxInput>,
    value: boolean,
  ) => void;
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
    case "django.forms.widgets.NumberInput":
    case "django.forms.widgets.URLInput":
    case "django.forms.widgets.DateInput":
    case "django.forms.widgets.DateTimeInput":
    case "django.forms.widgets.ClearableFileInput":
      return (
        <Input
          type={
            field.tag === "django.forms.widgets.DateInput"
              ? "date"
              : field.tag === "django.forms.widgets.DateTimeInput"
                ? "datetime-local"
                : field.widget.type
          }
          name={field.name}
          className={clsx(
            "w-full",
            field.widget.type === "file"
              ? "file-input file-input-bordered"
              : "input input-bordered",
          )}
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
        <BasicListbox
          name={field.name}
          value={field.value ?? ""}
          onChange={field.handler}
          optgroups={field.widget.optgroups.map((optgroup) => optgroup[1][0])}
          multiple={false}
        />
      );

    case "django.forms.widgets.SelectMultiple":
      return (
        <BasicListbox
          name={field.name}
          value={field.value ?? []}
          onChange={field.handler}
          optgroups={field.widget.optgroups.map((optgroup) => optgroup[1][0])}
          multiple={true}
        />
      );

    default:
      return <Widget field={field} />;
  }
};
