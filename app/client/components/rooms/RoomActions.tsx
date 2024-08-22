import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import React from "react";

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
}: RoomActionsProps) => {
  if (isMyRoom) {
    return (
      <div className="flex grow gap-x-2">
        {isLocked && canUnlock && (
          <button className="btn btn-warning grow" onClick={unlockRoom}>
            Unlock <LockOpenIcon className={ICON_CSS} />
          </button>
        )}

        {!isLocked && (
          <button className="btn btn-warning grow" onClick={lockRoom}>
            Lock <LockClosedIcon className={ICON_CSS} />
          </button>
        )}

        <button className="btn btn-error grow" onClick={leaveRoom}>
          Leave <ArrowRightStartOnRectangleIcon className={ICON_CSS} />
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary grow"
      disabled={!canEnter}
      onClick={enterRoom}
    >
      Enter <ArrowRightEndOnRectangleIcon className={ICON_CSS} />
    </button>
  );
};
