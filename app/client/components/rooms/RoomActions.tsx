import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { LoadingContentSpinner } from "../LoadingContentSpinner";

const ICON_CSS = "size-5";

interface RoomActionsProps {
  isMyRoom: boolean;
  isLocked: boolean;
  canUnlock: boolean;
  canEnter: boolean;
  enterRoom: () => void;
  leaveRoom: () => void;
  lockRoom: () => void;
  unlockRoom: () => void;
  enterRoomPending: boolean;
  leaveRoomPending: boolean;
  lockRoomPending: boolean;
  unlockRoomPending: boolean;
}

export const RoomActions = ({
  isMyRoom,
  isLocked,
  canUnlock,
  canEnter,
  enterRoom,
  leaveRoom,
  lockRoom,
  unlockRoom,
  enterRoomPending,
  leaveRoomPending,
  lockRoomPending,
  unlockRoomPending,
}: RoomActionsProps) => {
  if (isMyRoom) {
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
              Unlock <LockOpenIcon className={ICON_CSS} />
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
              Lock <LockClosedIcon className={ICON_CSS} />
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
            Leave <ArrowRightStartOnRectangleIcon className={ICON_CSS} />
          </LoadingContentSpinner>
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary grow"
      disabled={!canEnter || enterRoomPending}
      onClick={enterRoom}
    >
      <LoadingContentSpinner isLoading={enterRoomPending}>
        Enter <ArrowRightEndOnRectangleIcon className={ICON_CSS} />
      </LoadingContentSpinner>
    </button>
  );
};
