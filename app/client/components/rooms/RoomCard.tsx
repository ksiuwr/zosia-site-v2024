import { getLocalDateTime } from "@client/utils/time";

import { RoomData } from "@client/utils/roomData";
import { LockClosedIcon as LockClosedIconSolid } from "@heroicons/react/24/solid";
import { Context } from "@reactivated";
import clsx from "clsx";
import React, { useContext } from "react";
import { JoinLockedRoomDialog } from "./JoinLockedRoomDialog";
import { RoomActions } from "./RoomActions";
import { RoomInfoPopover } from "./RoomInfoPopover";
import { RoomMembersCount } from "./RoomMembersCount";
import { useRoomMutations } from "./RoomMutations";

interface RoomCardProps {
  roomData: RoomData;
  userIsInSomeRoomAlready: boolean;
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
  },
  userIsInSomeRoomAlready,
}: RoomCardProps) => {
  const { user } = useContext(Context);

  const {
    joinRoomMutation,
    leaveRoomMutation,
    lockRoomMutation,
    unlockRoomMutation,
  } = useRoomMutations(id, name);

  const [roomPasswordDialogOpen, setRoomPasswordDialogOpen] =
    React.useState(false);

  const isMyRoom = members.some((member) => member.id === user.id);
  const allPlaces = availableBedsSingle + availableBedsDouble * 2;
  const availablePlaces = allPlaces - members.length;

  const isLocked = lock !== undefined && lock.expirationDate > new Date();
  const canUnlock = isLocked && lock.password !== undefined;
  const canEnter = availablePlaces > 0 && !userIsInSomeRoomAlready;

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

  return (
    <div
      className={clsx(
        "card card-bordered card-compact border-base-content bg-base-100 lg:card-normal",
        isMyRoom && "order-first col-span-2 bg-base-300",
      )}
    >
      <div className="card-body justify-between">
        <div className="flex justify-between gap-x-4">
          <h2 className="card-title flex-col items-start lg:flex-row">
            {isMyRoom && <span>Your room: </span>} <span>{name}</span>{" "}
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
        <div className="divider my-5"></div>
        <div className="flex gap-x-4">
          <RoomInfoPopover
            roomName={name}
            members={members}
            availableBedsSingle={availableBedsSingle}
            availableBedsDouble={availableBedsDouble}
            description={description}
          />
          <RoomActions
            isMyRoom={isMyRoom}
            isLocked={isLocked}
            canUnlock={canUnlock}
            canEnter={canEnter}
            enterRoom={enterRoom}
            leaveRoom={leaveRoom}
            lockRoom={lockRoom}
            unlockRoom={unlockRoom}
          />
        </div>
      </div>
      <JoinLockedRoomDialog
        roomName={name}
        joinRoomMutation={joinRoomMutation}
        dialogOpen={roomPasswordDialogOpen}
        closeDialog={() => setRoomPasswordDialogOpen(false)}
      />
    </div>
  );
};
