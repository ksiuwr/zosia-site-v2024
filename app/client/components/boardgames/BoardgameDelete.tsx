import { TrashIcon } from "@heroicons/react/24/solid";
import { CSRFToken, reverse } from "@reactivated";
import React, { useState } from "react";
import { CustomDialog } from "../CustomDialog";

interface BoardgameDeleteProps {
  boardgameName: string;
  boardgameId: number;
}

export const BoardgameDelete = ({
  boardgameName,
  boardgameId,
}: BoardgameDeleteProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <button
        className="btn btn-error btn-xs btn-block lg:btn-md"
        onClick={openDialog}
      >
        <TrashIcon className="size-3 lg:size-6" />
        <span>Delete</span>
      </button>

      <CustomDialog
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        title="Delete boardgame"
      >
        <form method="post" action={reverse("boardgames_delete")}>
          <CSRFToken />
          <p className="mb-6">
            Are you sure you want to delete{" "}
            <strong>{`"${boardgameName}"`}</strong>?
          </p>
          <input type="hidden" name="boardgame_id" value={boardgameId} />
          <button type="submit" className="btn btn-error btn-block">
            Delete
          </button>
        </form>
      </CustomDialog>
    </>
  );
};
