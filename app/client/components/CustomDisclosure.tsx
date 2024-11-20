import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface CustomDisclosureProps {
  buttonLabel: string;
  panelContent: string;
}

export const CustomDisclosure = ({
  buttonLabel,
  panelContent,
}: CustomDisclosureProps) => {
  return (
    <Disclosure>
      <DisclosureButton className="group flex w-full flex-nowrap items-center justify-between gap-5 rounded-lg p-6 text-start font-normal hover:bg-base-content/20 data-[open]:rounded-b-none lg:text-lg">
        {buttonLabel}
        <ChevronDownIcon className="size-4 min-w-4 stroke-current group-data-[open]:rotate-180 [&>path]:stroke-[2]" />
      </DisclosureButton>
      <DisclosurePanel className="px-6 pb-4 pt-2">
        {panelContent}
      </DisclosurePanel>
    </Disclosure>
  );
};
