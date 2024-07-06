import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { PropsWithChildren } from "react";

interface AlertProps {
  type: "error" | "warning" | "info" | "success" | "debug";
}

export const Alert = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<AlertProps>
>(function Alert({ type, children }, ref) {
  const iconCSS = "size-6 stroke-current [&>path]:stroke-[2]";
  let alertCSS = "";
  let icon = <></>;

  switch (type) {
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
    <div
      ref={ref}
      role="alert"
      className={`alert my-3 w-full grid-flow-col ${alertCSS}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
});
