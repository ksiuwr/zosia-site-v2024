import { LoadingContentSpinner } from "@client/components/LoadingContentSpinner";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ROOM_ACTION_ICON_CSS } from "./RoomActions";

interface RoomActionsAdminProps {
  deleteRoom: () => void;
  editRoom: () => void;
  deleteRoomPending: boolean;
  editRoomPending: boolean;
}

export const RoomActionsAdmin = ({
  deleteRoom,
  editRoom,
  deleteRoomPending,
  editRoomPending,
}: RoomActionsAdminProps) => {
  return (
    <div className="flex grow gap-x-1 lg:gap-x-4">
      <button
        className="btn btn-info basis-1/2"
        onClick={editRoom}
        disabled={editRoomPending}
      >
        <LoadingContentSpinner isLoading={editRoomPending}>
          Edit <PencilIcon className={ROOM_ACTION_ICON_CSS} />
        </LoadingContentSpinner>
      </button>

      <button
        className="btn btn-error grow basis-1/2"
        onClick={deleteRoom}
        disabled={deleteRoomPending}
      >
        <LoadingContentSpinner isLoading={deleteRoomPending}>
          Delete <TrashIcon className={ROOM_ACTION_ICON_CSS} />
        </LoadingContentSpinner>
      </button>
    </div>
  );
};
