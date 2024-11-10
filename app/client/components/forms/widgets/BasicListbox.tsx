import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import React, { ComponentProps } from "react";

interface ListboxLike<
  TValue extends string | string[],
  TMultiple extends boolean,
> extends ComponentProps<typeof Listbox> {
  name: string;
  multiple: TMultiple;
  value: TValue;
  onChange: (value: TValue) => void;
  optgroups: {
    value: string | number | boolean | null;
    label: string;
  }[];
}

type BasicListboxProps<TMultiple extends boolean = true | false> =
  TMultiple extends true
    ? ListboxLike<string[], true>
    : ListboxLike<string, false>;

export const BasicListbox = ({
  name,
  multiple,
  value,
  onChange,
  optgroups,
  ...props
}: BasicListboxProps) => {
  return (
    <Listbox value={value} onChange={onChange} multiple={multiple} {...props}>
      {
        /* These hidden inputs allow us to send selected data through HTML <form/> via POST*/
        multiple ? (
          value.map((val) => (
            <input type="hidden" key={val} name={name} value={val} />
          ))
        ) : (
          <input type="hidden" name={name} value={value ?? ""} />
        )
      }
      <ListboxButton className="select select-bordered h-fit w-full py-2">
        {optgroups
          .filter((optgroup) => {
            if (multiple) {
              return value.includes(String(optgroup.value));
            } else {
              return String(optgroup.value) === value;
            }
          })
          .map((selectedOptGroup) => selectedOptGroup.label)
          .join(", ")}
      </ListboxButton>
      <ListboxOptions
        anchor="bottom start"
        className="w-[var(--button-width)] rounded-box bg-base-300 [--anchor-padding:1.5rem]"
      >
        {optgroups.map((optgroup) => {
          const currentOption = optgroup;
          const optgroupValue = (currentOption.value ?? "").toString();

          return (
            <ListboxOption
              key={optgroupValue}
              value={optgroupValue}
              className="group btn no-animation btn-block justify-start rounded-none font-normal data-[selected]:btn-success data-[focus]:btn-active"
            >
              {currentOption.label}
              <CheckIcon className="invisible size-6 group-data-[selected]:visible" />
            </ListboxOption>
          );
        })}
      </ListboxOptions>
    </Listbox>
  );
};
