import React, { PropsWithChildren } from "react";
import { CenteredContainer } from "./CenteredContainer";

export const CenteredFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <CenteredContainer>
      <div className="mx-auto mb-4 w-full lg:w-9/12 xl:w-7/12 2xl:w-6/12">
        {children}
      </div>
    </CenteredContainer>
  );
};
