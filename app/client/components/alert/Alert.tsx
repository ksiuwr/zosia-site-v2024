import React, { PropsWithChildren } from "react";
import { AlertIcon } from "./AlertIcon";

export type AlertType = "error" | "warning" | "info" | "success" | "debug";

interface AlertProps {
  type: AlertType;
}

const alertCSSMap: Record<AlertType, string> = {
  // All these class names need to be written as full strings,
  // because Tailwind does not support dynamic class names.
  error: "alert-error",
  warning: "alert-warning",
  success: "alert-success",
  info: "alert-info",
  debug: "",
};

export const Alert = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<AlertProps>
>(function Alert({ type, children }, ref) {
  return (
    <div
      ref={ref}
      role="alert"
      className={`alert mb-3 w-full grid-flow-col ${alertCSSMap[type]}`}
    >
      <AlertIcon type={type} />
      <div>{children}</div>
    </div>
  );
});
