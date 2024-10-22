import { Transition } from "@headlessui/react";

import React, { PropsWithChildren, ReactNode } from "react";
import toast from "react-hot-toast";
import { Alert, AlertType } from "./alert/Alert";

interface CustomToastProps {
  isToastVisible: boolean;
  levelTag: AlertType;
}

export const CustomToast = ({
  isToastVisible,
  levelTag,
  children,
}: PropsWithChildren<CustomToastProps>) => {
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
        <Alert type={levelTag}>{children}</Alert>
      </div>
    </Transition>
  );
};

export const showCustomToast = (levelTag: AlertType, message: ReactNode) => {
  toast.custom((t) => (
    <CustomToast isToastVisible={t.visible} levelTag={levelTag}>
      {message}
    </CustomToast>
  ));
};
