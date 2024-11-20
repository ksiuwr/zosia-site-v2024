import { Input } from "@headlessui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { CustomDialog } from "../CustomDialog";
import { LoadingContentSpinner } from "../LoadingContentSpinner";
import { ApiErrorMessage } from "./ApiErrorMessage";

interface JoinLockedRoomDialogProps {
  roomName: string;
  joinRoomMutation: UseMutationResult<
    AxiosResponse<unknown, unknown>,
    Error,
    string | undefined,
    unknown
  >;
  dialogOpen: boolean;
  closeDialog: () => void;
}

export const JoinLockedRoomDialog = ({
  roomName,
  joinRoomMutation,
  dialogOpen,
  closeDialog,
}: JoinLockedRoomDialogProps) => {
  const [typedPassword, setTypedPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typedPassword !== "") {
      joinRoomMutation.mutate(typedPassword, { onSuccess: closeDialog });
    }
  };

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      onClose={closeDialog}
      title={`Provide password for room ${roomName}`}
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="input input-bordered w-full"
          placeholder="Password"
          value={typedPassword}
          onChange={(e) => setTypedPassword(e.target.value)}
          autoFocus
        />

        <button
          className="btn btn-primary btn-block mt-4"
          type="submit"
          disabled={joinRoomMutation.isPending}
        >
          <LoadingContentSpinner isLoading={joinRoomMutation.isPending}>
            Enter room
          </LoadingContentSpinner>
        </button>

        {joinRoomMutation.isError && (
          <div className="prose mt-2 text-error">
            <ApiErrorMessage error={joinRoomMutation.error} />
          </div>
        )}
      </form>
    </CustomDialog>
  );
};
