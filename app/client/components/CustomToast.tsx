import { Transition } from "@headlessui/react";
import parse from "html-react-parser";
import React from "react";
import { Alert } from "./Alert";

interface CustomToastProps {
  isToastVisible: boolean;
  message: string;
  levelTag: "error" | "warning" | "info" | "success" | "debug";
}

export const CustomToast = ({
  isToastVisible,
  message,
  levelTag,
}: CustomToastProps) => {
  return (
    <Transition
      appear
      show={isToastVisible}
      enter="transition-all duration-200"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
    >
      <div className="w-fit">
        <Alert type={levelTag}>{parse(message)}</Alert>
      </div>
    </Transition>
  );
};
