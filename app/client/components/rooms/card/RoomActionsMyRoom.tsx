import { LoadingContentSpinner } from "@client/components/LoadingContentSpinner";
import {
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import { ROOM_ACTION_ICON_CSS } from "./RoomActions";

interface RoomActionsMyRoomProps {
  isLocked: boolean;
  canUnlock: boolean;
  leaveRoom: () => void;
  lockRoom: () => void;
  unlockRoom: () => void;
  leaveRoomPending: boolean;
  lockRoomPending: boolean;
  unlockRoomPending: boolean;
}

export const RoomActionsMyRoom = ({
  isLocked,
  canUnlock,
  leaveRoom,
  lockRoom,
  unlockRoom,
  leaveRoomPending,
  lockRoomPending,
  unlockRoomPending,
}: RoomActionsMyRoomProps) => {
  const showUnlockButton = isLocked && canUnlock;
  const showLockButton = !isLocked;

  return (
    <div className="flex grow gap-x-1 lg:gap-x-4">
      {showUnlockButton && (
        <button
          className="btn btn-warning basis-1/2"
          onClick={unlockRoom}
          disabled={unlockRoomPending}
        >
          <LoadingContentSpinner isLoading={unlockRoomPending}>
            Unlock <LockOpenIcon className={ROOM_ACTION_ICON_CSS} />
          </LoadingContentSpinner>
        </button>
      )}

      {showLockButton && (
        <button
          className="btn btn-warning basis-1/2"
          onClick={lockRoom}
          disabled={lockRoomPending}
        >
          <LoadingContentSpinner isLoading={lockRoomPending}>
            Lock <LockClosedIcon className={ROOM_ACTION_ICON_CSS} />
          </LoadingContentSpinner>
        </button>
      )}

      <button
        className={clsx(
          "btn btn-error grow",
          (showUnlockButton || showLockButton) && "basis-1/2",
        )}
        onClick={leaveRoom}
        disabled={leaveRoomPending}
      >
        <LoadingContentSpinner isLoading={leaveRoomPending}>
          Leave{" "}
          <ArrowRightStartOnRectangleIcon className={ROOM_ACTION_ICON_CSS} />
        </LoadingContentSpinner>
      </button>
    </div>
  );
};
