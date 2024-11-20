import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { AlertType } from "./Alert";

interface AlertIconProps {
  type: AlertType;
}

export const AlertIcon = ({ type }: AlertIconProps) => {
  const className = "size-6 stroke-current [&>path]:stroke-[2]";

  switch (type) {
    case "error":
      return <XCircleIcon className={className} />;
    case "warning":
      return <ExclamationTriangleIcon className={className} />;
    case "success":
      return <CheckCircleIcon className={className} />;
    default:
      return <InformationCircleIcon className={className} />;
  }
};
