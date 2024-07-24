import React, { PropsWithChildren } from "react";
import { CenteredContainer } from "./CenteredContainer";

export const CenteredFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <CenteredContainer>
      <div className="mx-auto mb-4 w-full lg:w-4/6 xl:w-1/2 2xl:w-5/12">
        {children}
      </div>
    </CenteredContainer>
  );
};
