import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface AdminTablePopoverProps {
  buttonLabel: string;
  panelContent: {
    header: string;
    description: string;
  }[];
}

export const AdminTablePopover = ({
  buttonLabel,
  panelContent,
}: AdminTablePopoverProps) => {
  return (
    <Popover className="group">
      <PopoverButton className="btn btn-ghost btn-sm btn-block h-fit flex-nowrap justify-between px-0 text-start group-data-[open]:btn-active lg:btn-md lg:py-8">
        <span>{buttonLabel}</span>
        <span>
          <ChevronDownIcon className="size-4 group-data-[open]:rotate-180 lg:size-6 [&>path]:stroke-[2]" />
        </span>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="z-50 mx-4 lg:mx-0 lg:w-[var(--button-width)]"
      >
        <div className="card flex gap-y-4 bg-base-300/95 p-6 text-xs lg:text-sm">
          {panelContent.map(({ header, description }) => (
            <div key={header}>
              <h1 className="mb-2 font-bold">{`${header}:`}</h1>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};
