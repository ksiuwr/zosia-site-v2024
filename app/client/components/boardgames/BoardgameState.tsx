import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface BoardgameStateProps {
  accepted: boolean;
  firstName?: string;
  lastName?: string;
}

export const BoardgameState = ({
  accepted,
  firstName,
  lastName,
}: BoardgameStateProps) => {
  if (accepted) {
    return (
      <div className="flex gap-x-2">
        <CheckCircleIcon className="size-5 lg:size-6" />
        <span>Accepted</span>
      </div>
    );
  }

  if (!firstName || !lastName) {
    return <span>Suggested</span>;
  }

  return <span>{`Suggested by ${firstName} ${lastName}`}</span>;
};
