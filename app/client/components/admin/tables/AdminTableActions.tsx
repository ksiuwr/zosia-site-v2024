import React, { PropsWithChildren } from "react";

export const AdminTableActions = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-stretch gap-2">{children}</div>;
};
