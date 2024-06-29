import React, { PropsWithChildren } from "react";

export const PageTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="my-8 text-center text-5xl font-bold">{children}</h1>;
};
