import { LoadingContentSpinner } from "@client/components/LoadingContentSpinner";
import React, { useState } from "react";
import { CustomDialog } from "../../CustomDialog";
import { useRoomMutations } from "../RoomMutations";
import { RoomPropertiesFormFieldCheckbox } from "./RoomPropertiesFormFieldCheckbox";
import { RoomPropertiesFormFieldInput } from "./RoomPropertiesFormFieldInput";

interface RoomPropertiesDialogProps {
  dialogOpen: boolean;
  onClose: () => void;
}

export const RoomPropertiesDialog = ({
  dialogOpen,
  onClose,
}: RoomPropertiesDialogProps) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const [availableBedsSingle, setAvailableBedsSingle] = useState(0);
  const [availableBedsDouble, setAvailableBedsDouble] = useState(0);
  const [bedsSingle, setBedsSingle] = useState(0);
  const [bedsDouble, setBedsDouble] = useState(0);

  const [roomHidden, setRoomHidden] = useState(false);

  const { createRoomMutation } = useRoomMutations(0, "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoomMutation.mutate({
      name: roomName,
      description: roomDescription,
      available_beds_single: availableBedsSingle,
      available_beds_double: availableBedsDouble,
      beds_single: bedsSingle,
      beds_double: bedsDouble,
      hidden: roomHidden,
    });
  };

  return (
    <CustomDialog dialogOpen={dialogOpen} onClose={onClose} title="Add room">
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
            Add room
          </LoadingContentSpinner>
        </button>
      </form>
    </CustomDialog>
  );
};
