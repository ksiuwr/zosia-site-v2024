import React from "react";
import { RoomMembersCount } from "./RoomMembersCount";

interface Member {
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
  const availablePlaces = availableBedsSingle + availableBedsDouble * 2;

  return (
    <div className="card card-bordered border-base-content bg-base-100">
      <div className="card-body">
        <div className="flex justify-between gap-x-4">
          <h2 className="card-title whitespace-nowrap">{name}</h2>
          <RoomMembersCount
            membersCount={members.length}
            maxMembers={availablePlaces + 5}
          />
        </div>
        <div className="divider my-1"></div>
        <div className="flex gap-x-4">
          <button className="btn btn-ghost grow">More</button>
          <button className="btn btn-primary grow">Enter</button>
        </div>
      </div>
    </div>
  );
};
