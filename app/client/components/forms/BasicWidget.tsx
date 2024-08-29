import {
  Checkbox,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Textarea,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FieldHandler, Widget } from "@reactivated";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsCheckboxInput } from "reactivated/dist/generated";

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
    case "django.forms.widgets.SelectMultiple":
      return (
        <Listbox
          value={field.value ?? ""}
          onChange={field.handler}
          multiple={field.tag === "django.forms.widgets.SelectMultiple"}
        >
          {/* These hidden inputs allow us to send selected data through HTML <form/> */}
          {field.tag === "django.forms.widgets.Select" && (
            <input type="hidden" name={field.name} value={field.value ?? ""} />
          )}
          {field.tag === "django.forms.widgets.SelectMultiple" &&
            field.value.map((value) => (
              <input
                type="hidden"
                key={value}
                name={field.name}
                value={value}
              />
            ))}
          <ListboxButton className="select select-bordered h-fit w-full py-2">
            {field.widget.optgroups
              .filter((optgroup) => {
                if (field.tag === "django.forms.widgets.Select")
                  return optgroup[1][0].value === field.value;

                if (field.tag === "django.forms.widgets.SelectMultiple")
                  return field.value.includes(String(optgroup[1][0].value));
              })
              .map((selectedOptGroup) => selectedOptGroup[1][0].label)
              .join(", ")}
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            className="w-[var(--button-width)] rounded-box bg-base-300 [--anchor-padding:1.5rem]"
          >
            {field.widget.optgroups.map((optgroup) => {
              const currentOption = optgroup[1][0];
              const optgroupValue = (currentOption.value ?? "").toString();

              return (
                <ListboxOption
                  key={optgroupValue}
                  value={optgroupValue}
                  className="group btn no-animation btn-block rounded-none font-normal data-[selected]:btn-success data-[focus]:btn-active"
                >
                  {currentOption.label}
                  <CheckIcon className="invisible size-6 group-data-[selected]:visible" />
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Listbox>
      );
    default:
      return <Widget field={field} />;
  }
};
