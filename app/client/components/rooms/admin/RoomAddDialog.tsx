import React from "react";
import { CustomDialog } from "../../CustomDialog";
import { RoomPropertiesForm } from "./RoomPropertiesForm";

interface RoomAddDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export const RoomAddDialog = ({
  dialogOpen,
  closeDialog,
}: RoomAddDialogProps) => {
  const title = "Add room";

  return (
    <CustomDialog dialogOpen={dialogOpen} onClose={closeDialog} title={title}>
      <RoomPropertiesForm closeDialog={closeDialog} submitButtonLabel={title} />
    </CustomDialog>
  );
};
