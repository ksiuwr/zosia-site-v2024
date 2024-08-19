import {
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Context } from "@reactivated";
import clsx from "clsx";
import React, { useContext } from "react";
import { RoomInfoPopover } from "./RoomInfoPopover";
import { RoomMembersCount } from "./RoomMembersCount";

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
}

interface RoomCardProps {
  name: string;
  description: string;
  members: Member[];
  availableBedsSingle: number;
  availableBedsDouble: number;
}

export const RoomCard = ({
  name,
  description,
  members,
  availableBedsSingle,
  availableBedsDouble,
}: RoomCardProps) => {
  const { user } = useContext(Context);

  const isMyRoom = members.some((member) => member.id === user.id);

  const availablePlaces = availableBedsSingle + availableBedsDouble * 2;

  return (
    <div
      className={clsx(
        "card card-bordered card-compact border-base-content bg-base-100 lg:card-normal",
        isMyRoom && "order-first col-span-2 bg-base-300",
      )}
    >
      <div className="card-body">
        <div className="flex justify-between gap-x-4">
          <h2 className="card-title flex-col items-start lg:flex-row">
            {isMyRoom && <span>Your room: </span>} <span>{name}</span>
          </h2>
          <RoomMembersCount
            membersCount={members.length}
            maxMembers={availablePlaces}
          />
        </div>
        <div className="divider my-5"></div>
        <div className="flex gap-x-4">
          <RoomInfoPopover
            roomName={name}
            members={members}
            availableBedsSingle={availableBedsSingle}
            availableBedsDouble={availableBedsDouble}
            description={description}
          />
          {isMyRoom ? (
            <div className="flex grow gap-x-2">
              <button className="btn btn-warning grow">
                Lock <LockClosedIcon className="size-5" />
              </button>
              <button className="btn btn-error grow">
                Leave <ArrowRightStartOnRectangleIcon className="size-5" />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary grow">Enter</button>
          )}
        </div>
      </div>
    </div>
  );
};
