import { CustomDialog } from "@client/components/CustomDialog";
import { LoadingContentSpinner } from "@client/components/LoadingContentSpinner";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

interface RoomDeleteConfirmationDialogProps {
  roomName: string;
  deleteRoomMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
    Error,
    void,
    unknown
  >;
  dialogOpen: boolean;
  closeDialog: () => void;
}

export const RoomDeleteConfirmationDialog = ({
  roomName,
  deleteRoomMutation,
  dialogOpen,
  closeDialog,
}: RoomDeleteConfirmationDialogProps) => {
  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      onClose={closeDialog}
      title={`Are you sure you want to delete room ${roomName}?`}
    >
      <button
        className="btn btn-error btn-block mt-4"
        disabled={deleteRoomMutation.isPending}
        onClick={() =>
          deleteRoomMutation.mutate(undefined, { onSuccess: closeDialog })
        }
      >
        <LoadingContentSpinner isLoading={deleteRoomMutation.isPending}>
          Yes, delete room
        </LoadingContentSpinner>
      </button>
    </CustomDialog>
  );
};
