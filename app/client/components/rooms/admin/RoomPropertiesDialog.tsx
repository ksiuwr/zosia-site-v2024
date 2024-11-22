import { LoadingContentSpinner } from "@client/components/LoadingContentSpinner";
import { RoomData } from "@client/utils/roomData";
import React, { useState } from "react";
import { CustomDialog } from "../../CustomDialog";
import { useRoomMutations } from "../api/RoomMutations";
import { RoomPropertiesFormFieldCheckbox } from "./RoomPropertiesFormFieldCheckbox";
import { RoomPropertiesFormFieldInput } from "./RoomPropertiesFormFieldInput";

interface RoomPropertiesDialogProps {
  roomData?: RoomData;
  dialogOpen: boolean;
  closeDialog: () => void;
}

export const RoomPropertiesDialog = ({
  roomData,
  dialogOpen,
  closeDialog,
}: RoomPropertiesDialogProps) => {
  const [roomName, setRoomName] = useState(roomData ? roomData.name : "");
  const [roomDescription, setRoomDescription] = useState(
    roomData ? roomData.description : "",
  );

  const [availableBedsSingle, setAvailableBedsSingle] = useState(
    roomData ? roomData.availableBedsSingle : 0,
  );
  const [availableBedsDouble, setAvailableBedsDouble] = useState(
    roomData ? roomData.availableBedsDouble : 0,
  );
  const [bedsSingle, setBedsSingle] = useState(
    roomData ? roomData.bedsSingle : 0,
  );
  const [bedsDouble, setBedsDouble] = useState(
    roomData ? roomData.bedsDouble : 0,
  );

  const [roomHidden, setRoomHidden] = useState(
    roomData ? roomData.hidden : false,
  );

  const { createRoomMutation, editRoomMutation } = useRoomMutations(
    roomData ? roomData.id : -1,
    roomName,
  );

  const isInEditMode = roomData !== undefined;
  const title = isInEditMode ? "Edit room" : "Add room";

  const resetFormState = () => {
    setRoomName("");
    setRoomDescription("");
    setAvailableBedsSingle(0);
    setAvailableBedsDouble(0);
    setBedsSingle(0);
    setBedsDouble(0);
    setRoomHidden(false);
  };

  const onMutationSuccess = () => {
    resetFormState();
    closeDialog();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInEditMode) {
      editRoomMutation.mutate(
        {
          id: roomData.id,
          name: roomName,
          description: roomDescription,
          available_beds_single: availableBedsSingle,
          available_beds_double: availableBedsDouble,
          beds_single: bedsSingle,
          beds_double: bedsDouble,
          hidden: roomHidden,
        },
        { onSuccess: onMutationSuccess },
      );
    } else {
      createRoomMutation.mutate(
        {
          name: roomName,
          description: roomDescription,
          available_beds_single: availableBedsSingle,
          available_beds_double: availableBedsDouble,
          beds_single: bedsSingle,
          beds_double: bedsDouble,
          hidden: roomHidden,
        },
        { onSuccess: onMutationSuccess },
      );
    }
  };

  return (
    <CustomDialog dialogOpen={dialogOpen} onClose={closeDialog} title={title}>
      <form onSubmit={handleSubmit}>
        <RoomPropertiesFormFieldInput
          label="Room name"
          type="text"
          value={roomName}
          onChange={setRoomName}
          required
        />
        <RoomPropertiesFormFieldInput
          label="Room description"
          type="text"
          value={roomDescription}
          onChange={setRoomDescription}
        />
        <RoomPropertiesFormFieldInput
          label="Available single beds"
          type="number"
          value={availableBedsSingle.toString()}
          onChange={(newValue) => setAvailableBedsSingle(parseInt(newValue))}
        />
        <RoomPropertiesFormFieldInput
          label="Available double beds"
          type="number"
          value={availableBedsDouble.toString()}
          onChange={(newValue) => setAvailableBedsDouble(parseInt(newValue))}
        />
        <RoomPropertiesFormFieldInput
          label="Single beds"
          type="number"
          value={bedsSingle.toString()}
          onChange={(newValue) => setBedsSingle(parseInt(newValue))}
        />
        <RoomPropertiesFormFieldInput
          label="Double beds"
          type="number"
          value={bedsDouble.toString()}
          onChange={(newValue) => setBedsDouble(parseInt(newValue))}
        />
        <RoomPropertiesFormFieldCheckbox
          label="Hidden"
          checked={roomHidden}
          onChange={setRoomHidden}
        />
        <button
          type="submit"
          className="btn btn-success btn-lg btn-block"
          disabled={createRoomMutation.isPending}
        >
          <LoadingContentSpinner isLoading={createRoomMutation.isPending}>
            {title}
          </LoadingContentSpinner>
        </button>
      </form>
    </CustomDialog>
  );
};
