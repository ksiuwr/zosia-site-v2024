import React, { PropsWithChildren } from "react";

export const CenteredContainer = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto w-5/6 2xl:container lg:w-4/6">{children}</div>;
};
