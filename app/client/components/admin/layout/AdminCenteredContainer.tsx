import { CenteredContainer } from "@client/components/containers/CenteredContainer";
import React, { PropsWithChildren } from "react";

export const AdminCenteredContainer = ({ children }: PropsWithChildren) => {
  return <CenteredContainer adminSidebarShown>{children}</CenteredContainer>;
};
