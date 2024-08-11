import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { PropsWithChildren } from "react";

interface CustomDialogProps {
  dialogOpen: boolean;
  onClose: () => void;
  title: string;
}

export const CustomDialog = ({
  dialogOpen,
  onClose,
  title,
  children,
}: PropsWithChildren<CustomDialogProps>) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      transition
      className="duration-250 transition ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="modal-box">
          <DialogTitle className="mb-6 text-xl font-bold">{title}</DialogTitle>

          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};