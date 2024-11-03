import { RoomMember } from "@client/utils/roomData";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

interface RoomInfoPopoverProps {
  roomName: string;
  members: RoomMember[];
  availableBedsSingle: number;
  availableBedsDouble: number;
  description: string;
}

export const RoomInfoPopover = ({
  roomName,
  members,
  availableBedsSingle,
  availableBedsDouble,
  description,
}: RoomInfoPopoverProps) => {
  return (
    <Popover>
      <PopoverButton className="btn btn-ghost flex-nowrap">
        More <ChevronUpIcon className="size-4" />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute bottom-0 left-0 z-50 h-full w-full origin-bottom-left transition duration-200 ease-in-out data-[closed]:scale-0 data-[closed]:opacity-0"
      >
        <div className="card card-compact h-full min-h-fit w-full bg-base-100">
          <CloseButton className="btn btn-circle btn-ghost absolute right-0 top-0 lg:right-2 lg:top-2">
            <XMarkIcon className="size-5 lg:size-6" />
          </CloseButton>
          <div className="prose card-body max-w-none">
            <h3>{roomName}</h3>
            <p>
              <strong>Members:</strong>{" "}
              {members
                .map((user) => `${user.firstName} ${user.lastName}`)
                .join(", ")}
              <br />
              <strong>Beds:</strong>{" "}
              {`${availableBedsSingle} single, ${availableBedsDouble} double`}
              <br />
              <strong>Description:</strong> {description}
            </p>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
