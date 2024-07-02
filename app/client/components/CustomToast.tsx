import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

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
  const iconCSS = "size-6 stroke-current [&>path]:stroke-[2]";
  let alertCSS = "";
  let icon = <></>;
  switch (levelTag) {
    case "error":
      icon = <XCircleIcon className={iconCSS} />;
      alertCSS = "alert-error";
      break;
    case "warning":
      icon = <ExclamationTriangleIcon className={iconCSS} />;
      alertCSS = "alert-warning";
      break;
    case "success":
      icon = <CheckCircleIcon className={iconCSS} />;
      alertCSS = "alert-success";
      break;
    case "info":
      icon = <InformationCircleIcon className={iconCSS} />;
      alertCSS = "alert-info";
      break;
    default:
      icon = <InformationCircleIcon className={iconCSS} />;
      alertCSS = "";
      break;
  }

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
      <div role="alert" className={`alert w-fit grid-flow-col ${alertCSS}`}>
        {icon}
        <span>{message}</span>
      </div>
    </Transition>
  );
};
