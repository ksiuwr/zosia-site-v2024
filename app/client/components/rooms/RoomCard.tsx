import { getLocalDateTime } from "@client/utils/time";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";

import { LockClosedIcon as LockClosedIconSolid } from "@heroicons/react/24/solid";
import { Context } from "@reactivated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useContext } from "react";
import { showCustomToast } from "../CustomToast";
import { ApiErrorMessage } from "./ApiErrorMessage";
import { RoomData } from "./RoomCards";
import { RoomInfoPopover } from "./RoomInfoPopover";
import { RoomMembersCount } from "./RoomMembersCount";

interface RoomCardProps {
  roomData: RoomData;
  userIsInSomeRoomAlready: boolean;
}

const ICON_CSS = "size-5";

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

  const queryClient = useQueryClient();

  const invalidateRoomsData = () => {
    queryClient.invalidateQueries({
      queryKey: [zosiaApiRoutes.rooms],
    });
  };

  const onMutationError = (error: Error) => {
    showCustomToast("error", <ApiErrorMessage error={error} />);
    console.error(error);
  };

  const joinRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post(zosiaApiRoutes.roomMember(id), {
        user: user.id,
        password: "",
      });
    },
    onSuccess: () => {
      invalidateRoomsData();
      showCustomToast("success", `You've joined room ${name}`);
    },
    onError: onMutationError,
  });

  const leaveRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.delete(zosiaApiRoutes.roomMember(id), {
        data: { user: user.id },
      });
    },
    onSuccess: () => {
      invalidateRoomsData();
      showCustomToast("success", `You've left room ${name}`);
    },
    onError: onMutationError,
  });

  const lockRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post(zosiaApiRoutes.lockRoom(id), {
        user: user.id,
      });
    },
    onSuccess: (data) => {
      invalidateRoomsData();
      const roomData = data.data as RoomData;
      const expirationDate = roomData.lock
        ? getLocalDateTime(roomData.lock.expirationDate)
        : "";

      showCustomToast(
        "success",
        `You've locked room ${name} until ${expirationDate}.`,
      );
    },
    onError: onMutationError,
  });

  const unlockRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.delete(zosiaApiRoutes.lockRoom(id));
    },
    onSuccess: () => {
      invalidateRoomsData();
      showCustomToast(
        "success",
        `You've unlocked room ${name}. Now everybody can join it.`,
      );
    },
    onError: onMutationError,
  });

  const isMyRoom = members.some((member) => member.id === user.id);
  const allPlaces = availableBedsSingle + availableBedsDouble * 2;
  const availablePlaces = allPlaces - members.length;

  const isLocked = lock !== undefined && lock.expirationDate > new Date();
  const canUnlock = isLocked && lock.password !== undefined;

  const enterRoom = () => joinRoomMutation.mutate();
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
          {isMyRoom ? (
            <div className="flex grow gap-x-2">
              {isLocked ? (
                <button className="btn btn-warning grow" onClick={unlockRoom}>
                  Unlock <LockOpenIcon className={ICON_CSS} />
                </button>
              ) : (
                <button className="btn btn-warning grow" onClick={lockRoom}>
                  Lock <LockClosedIcon className={ICON_CSS} />
                </button>
              )}

              <button className="btn btn-error grow" onClick={leaveRoom}>
                Leave <ArrowRightStartOnRectangleIcon className={ICON_CSS} />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary grow"
              disabled={availablePlaces <= 0 || userIsInSomeRoomAlready}
              onClick={enterRoom}
            >
              Enter <ArrowRightEndOnRectangleIcon className={ICON_CSS} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
