import React, { PropsWithChildren } from "react";
import { AlertIcon } from "./AlertIcon";

export type AlertType = "error" | "warning" | "info" | "success" | "debug";

interface AlertProps {
  type: AlertType;
}

const getAlertCSS = (type: AlertType) => {
  switch (type) {
    // All these class names need to be written as full strings,
    // because Tailwind does not support dynamic class names.
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "success":
      return "alert-success";
    case "info":
      return "alert-info";
    default:
      return "";
  }
};

export const Alert = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<AlertProps>
>(function Alert({ type, children }, ref) {
  return (
    <div
      ref={ref}
      role="alert"
      className={`alert my-3 w-full grid-flow-col ${getAlertCSS(type)}`}
    >
      <AlertIcon type={type} />
      <span>{children}</span>
    </div>
  );
});
