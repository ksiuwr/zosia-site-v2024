import React, { PropsWithChildren } from "react";
import { CenteredContainer } from "./CenteredContainer";

export const CenteredContentContainer = ({ children }: PropsWithChildren) => {
  return (
    <CenteredContainer>
      <div className="mx-auto w-full lg:w-10/12 xl:w-9/12 2xl:w-8/12">
        {children}
      </div>
    </CenteredContainer>
  );
};
