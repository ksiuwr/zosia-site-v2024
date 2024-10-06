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
      <PopoverButton className="btn btn-ghost btn-xs btn-block h-fit flex-nowrap justify-between lg:btn-md">
        {buttonLabel}
        <ChevronDownIcon className="size-6 group-data-[open]:rotate-180 [&>path]:stroke-[2]" />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="z-50 w-[var(--button-width)]">
        <div className="card flex gap-y-4 bg-base-300/90 p-6 text-xs lg:text-sm">
          {panelContent.map(({ header, description }) => (
            <div key={header}>
              <h1 className="mb-2 font-bold">{header}</h1>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};
