import {
  convertRoomAPIDataToRoomData,
  RoomAPIData,
  RoomData,
} from "@client/utils/roomData";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Context } from "@reactivated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { showCustomToast } from "../CustomToast";
import { ApiErrorMessage } from "./ApiErrorMessage";

export const useRoomMutations = (roomId: number, roomName: string) => {
  const { user } = useContext(Context);

  const queryClient = useQueryClient();

  const onMutationSuccess = (
    data: AxiosResponse<RoomAPIData, unknown>,
    message: string,
  ) => {
    const updatedRoom = convertRoomAPIDataToRoomData(data.data);
    queryClient.setQueryData([zosiaApiRoutes.rooms], (oldData: RoomData[]) => {
      return oldData.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room,
      );
    });
    showCustomToast("success", message);
  };

  const onMutationError = (error: Error) => {
    showCustomToast("error", <ApiErrorMessage error={error} />);
    console.error(error);
  };

  const joinRoomMutation = useMutation({
    mutationFn: async (password?: string) => {
      return await zosiaApi.post<RoomAPIData>(
        zosiaApiRoutes.roomMember(roomId),
        {
          user: user.id,
          password: password,
        },
      );
    },
    onSuccess: (data) =>
      onMutationSuccess(data, `You've joined room ${roomName}.`),
    onError: onMutationError,
  });

  const leaveRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.delete<RoomAPIData>(
        zosiaApiRoutes.roomMember(roomId),
        {
          data: { user: user.id },
        },
      );
    },
    onSuccess: (data) =>
      onMutationSuccess(data, `You've left room ${roomName}.`),
    onError: onMutationError,
  });

  const lockRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<RoomAPIData>(zosiaApiRoutes.lockRoom(roomId), {
        user: user.id,
      });
    },
    onSuccess: (data) =>
      onMutationSuccess(
        data,
        `You've locked room ${roomName}. Share the password with your friends.`,
      ),
    onError: onMutationError,
  });

  const unlockRoomMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.delete<RoomAPIData>(
        zosiaApiRoutes.lockRoom(roomId),
      );
    },
    onSuccess: (data) =>
      onMutationSuccess(
        data,
        `You've unlocked room ${roomName}. Now everybody can join it.`,
      ),
    onError: onMutationError,
  });

  return {
    joinRoomMutation,
    leaveRoomMutation,
    lockRoomMutation,
    unlockRoomMutation,
  };
};