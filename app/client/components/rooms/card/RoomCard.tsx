import { getLocalDateTime } from "@client/utils/time";

import { RoomData } from "@client/utils/roomData";
import { LockClosedIcon as LockClosedIconSolid } from "@heroicons/react/24/solid";
import { Context } from "@reactivated";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { RoomDeleteConfirmationDialog } from "../admin/RoomDeleteConfirmationDialog";
import { useRoomMutations } from "../api/RoomMutations";
import { JoinLockedRoomDialog } from "../JoinLockedRoomDialog";
import { RoomActions } from "./RoomActions";
import { RoomInfoPopover } from "./RoomInfoPopover";
import { RoomMembersCount } from "./RoomMembersCount";

interface RoomCardProps {
  roomData: RoomData;
  userIsInSomeRoomAlready: boolean;
  isAdmin?: boolean;
}

export const RoomCard = ({
  roomData: {
    id,
    name,
    description,
    members,
    lock,
    availableBedsSingle,
    availableBedsDouble,
    hidden,
  },
  userIsInSomeRoomAlready,
  isAdmin,
}: RoomCardProps) => {
  const { user } = useContext(Context);

  const {
    joinRoomMutation,
    leaveRoomMutation,
    lockRoomMutation,
    unlockRoomMutation,
    deleteRoomMutation,
    editRoomMutation,
  } = useRoomMutations(id, name);

  const [roomPasswordDialogOpen, setRoomPasswordDialogOpen] = useState(false);
  const [
    roomDeleteConfirmationDialogOpen,
    setRoomDeleteConfirmationDialogOpen,
  ] = useState(false);

  const allPlaces = availableBedsSingle + availableBedsDouble * 2;
  const availablePlaces = allPlaces - members.length;
  const canEnter = availablePlaces > 0 && !userIsInSomeRoomAlready;

  const isLocked = lock !== undefined && lock.expirationDate > new Date();
  const canUnlock = isLocked && lock.password !== undefined;

  const isMyRoom = members.some((member) => member.id === user.id);

  const enterRoom = () => {
    if (isLocked) {
      setRoomPasswordDialogOpen(true);
    } else {
      joinRoomMutation.mutate("");
    }
  };
  const leaveRoom = () => leaveRoomMutation.mutate();
  const lockRoom = () => lockRoomMutation.mutate();
  const unlockRoom = () => unlockRoomMutation.mutate();
  const deleteRoom = () => setRoomDeleteConfirmationDialogOpen(true);
  const editRoom = () => alert("TODO: Edit room");

  return (
    <div
      className={clsx(
        "card card-bordered card-compact border-base-content bg-base-100 lg:card-normal",
        isMyRoom && "order-first col-span-2 bg-base-300",
        hidden && "glass bg-base-content text-base-100",
      )}
    >
      <div className="card-body justify-between">
        <div className="flex justify-between gap-x-4">
          <h2 className="card-title flex-col items-start lg:flex-row">
            {isMyRoom && <span>Your room: </span>}{" "}
            <span>{`${name}${hidden ? " (hidden room)" : ""} `}</span>
            {isLocked && <LockClosedIconSolid className="size-6" />}
          </h2>
          <RoomMembersCount
            membersCount={members.length}
            availablePlaces={availablePlaces}
          />
        </div>
        {isLocked && (
          <p className="prose">
            Locked until:{" "}
            <strong>{getLocalDateTime(lock.expirationDate)}</strong>
            <br />
            {canUnlock && (
              <span>
                Password: <strong>{lock.password}</strong>
              </span>
            )}
          </p>
        )}
        <div className="divider my-4 lg:my-5"></div>
        <div className="flex gap-x-1 lg:gap-x-4">
          <RoomInfoPopover
            roomName={name}
            members={members}
            availableBedsSingle={availableBedsSingle}
            availableBedsDouble={availableBedsDouble}
            description={description}
          />
          <RoomActions
            isAdmin={isAdmin}
            isMyRoom={isMyRoom}
            isLocked={isLocked}
            canUnlock={canUnlock}
            canEnter={canEnter}
            enterRoom={enterRoom}
            leaveRoom={leaveRoom}
            lockRoom={lockRoom}
            unlockRoom={unlockRoom}
            deleteRoom={deleteRoom}
            editRoom={editRoom}
            enterRoomPending={joinRoomMutation.isPending}
            leaveRoomPending={leaveRoomMutation.isPending}
            lockRoomPending={lockRoomMutation.isPending}
            unlockRoomPending={unlockRoomMutation.isPending}
            deleteRoomPending={deleteRoomMutation.isPending}
            editRoomPending={editRoomMutation.isPending}
          />
        </div>
      </div>
      <JoinLockedRoomDialog
        roomName={name}
        joinRoomMutation={joinRoomMutation}
        dialogOpen={roomPasswordDialogOpen}
        closeDialog={() => setRoomPasswordDialogOpen(false)}
      />
      <RoomDeleteConfirmationDialog
        roomName={name}
        deleteRoomMutation={deleteRoomMutation}
        dialogOpen={roomDeleteConfirmationDialogOpen}
        closeDialog={() => setRoomDeleteConfirmationDialogOpen(false)}
      />
    </div>
  );
};
