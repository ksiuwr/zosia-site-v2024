import React, { PropsWithChildren } from "react";

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="my-5 text-center text-3xl font-bold lg:my-8 lg:text-5xl">
      {children}
    </h1>
  );
};
