import { CenteredFormContainer } from "@client/components/containers/CenteredFormContainer";
import React, { PropsWithChildren } from "react";

export const AdminCenteredFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <CenteredFormContainer adminSidebarShown>{children}</CenteredFormContainer>
  );
};
