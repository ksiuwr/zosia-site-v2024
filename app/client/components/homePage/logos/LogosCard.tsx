import React, { PropsWithChildren } from "react";

interface LogosCardProps {
  header: string;
}

export const LogosCard = ({
  header,
  children,
}: PropsWithChildren<LogosCardProps>) => {
  return (
    <div className="py-10">
      <h2 className="mb-6 text-center text-xl font-bold lg:text-4xl">
        {header}
      </h2>
      <div className="mx-auto flex w-5/6 flex-col flex-wrap justify-center gap-4 lg:w-4/6 lg:flex-row lg:gap-10">
        {children}
      </div>
    </div>
  );
};
