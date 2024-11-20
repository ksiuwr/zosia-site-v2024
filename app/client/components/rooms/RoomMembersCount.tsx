import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import React from "react";

interface RoomMembersCountProps {
  membersCount: number;
  availablePlaces: number;
}

export const RoomMembersCount = ({
  membersCount,
  availablePlaces,
}: RoomMembersCountProps) => {
  return (
    <div className="flex flex-wrap">
      {Array.from(Array(membersCount).keys()).map((i) => (
        <UserIconSolid key={i} className="size-6" />
      ))}
      {Array.from(Array(availablePlaces).keys()).map((i) => (
        <UserIconOutline key={i} className="size-6" />
      ))}
    </div>
  );
};
