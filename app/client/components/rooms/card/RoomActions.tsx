import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { LoadingContentSpinner } from "../../LoadingContentSpinner";
import { RoomActionsAdmin } from "./RoomActionsAdmin";
import { RoomActionsMyRoom } from "./RoomActionsMyRoom";

export const ROOM_ACTION_ICON_CSS = "size-5";

interface RoomActionsProps {
  isAdmin?: boolean;
  isMyRoom: boolean;
  isLocked: boolean;
  canUnlock: boolean;
  canEnter: boolean;
  enterRoom: () => void;
  leaveRoom: () => void;
  lockRoom: () => void;
  unlockRoom: () => void;
  deleteRoom: () => void;
  editRoom: () => void;

  enterRoomPending: boolean;
  leaveRoomPending: boolean;
  lockRoomPending: boolean;
  unlockRoomPending: boolean;
  deleteRoomPending: boolean;
  editRoomPending: boolean;
}

export const RoomActions = ({
  isAdmin,
  isMyRoom,
  isLocked,
  canUnlock,
  canEnter,
  enterRoom,
  leaveRoom,
  lockRoom,
  unlockRoom,
  deleteRoom,
  editRoom,
  enterRoomPending,
  leaveRoomPending,
  lockRoomPending,
  unlockRoomPending,
  deleteRoomPending,
  editRoomPending,
}: RoomActionsProps) => {
  if (isAdmin) {
    return (
      <RoomActionsAdmin
        deleteRoom={deleteRoom}
        editRoom={editRoom}
        deleteRoomPending={deleteRoomPending}
        editRoomPending={editRoomPending}
      />
    );
  }

  if (isMyRoom) {
    return (
      <RoomActionsMyRoom
        isLocked={isLocked}
        canUnlock={canUnlock}
        leaveRoom={leaveRoom}
        lockRoom={lockRoom}
        unlockRoom={unlockRoom}
        leaveRoomPending={leaveRoomPending}
        lockRoomPending={lockRoomPending}
        unlockRoomPending={unlockRoomPending}
      />
    );
  }

  return (
    <button
      className="btn btn-primary grow"
      disabled={!canEnter || enterRoomPending}
      onClick={enterRoom}
    >
      <LoadingContentSpinner isLoading={enterRoomPending}>
        Enter <ArrowRightEndOnRectangleIcon className={ROOM_ACTION_ICON_CSS} />
      </LoadingContentSpinner>
    </button>
  );
};
