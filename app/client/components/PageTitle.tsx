import React, { PropsWithChildren } from "react";

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="my-8 text-center text-3xl font-bold lg:text-5xl">
      {children}
    </h1>
  );
};
