import { apiErrorToast, successToast } from "@client/utils/toast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Context } from "@reactivated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useContext } from "react";
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

  const joinRoomMutation = useMutation({
    mutationFn: async () => {
      await zosiaApi.post(zosiaApiRoutes.roomMember(id), {
        user: user.id,
        password: "",
      });
    },
    onSuccess: () => {
      invalidateRoomsData();
      successToast(`You've joined room ${name}`);
    },
    onError: apiErrorToast,
  });

  const leaveRoomMutation = useMutation({
    mutationFn: async () => {
      await zosiaApi.delete(zosiaApiRoutes.roomMember(id), {
        data: { user: user.id },
      });
    },
    onSuccess: () => {
      invalidateRoomsData();
      successToast(`You've left room ${name}`);
    },
    onError: apiErrorToast,
  });

  const isMyRoom = members.some((member) => member.id === user.id);
  const allPlaces = availableBedsSingle + availableBedsDouble * 2;
  const availablePlaces = allPlaces - members.length;

  const enterRoom = () => joinRoomMutation.mutate();
  const leaveRoom = () => leaveRoomMutation.mutate();

  return (
    <div
      className={clsx(
        "card card-bordered card-compact border-base-content bg-base-100 lg:card-normal",
        isMyRoom && "order-first col-span-2 bg-base-300",
      )}
    >
      <div className="card-body">
        <div className="flex justify-between gap-x-4">
          <h2 className="card-title flex-col items-start lg:flex-row">
            {isMyRoom && <span>Your room: </span>} <span>{name}</span>
          </h2>
          <RoomMembersCount
            membersCount={members.length}
            availablePlaces={availablePlaces}
          />
        </div>
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
              <button className="btn btn-warning grow">
                Lock <LockClosedIcon className={ICON_CSS} />
              </button>
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
