import React, { PropsWithChildren } from "react";

interface LoadingContentSpinnerProps {
  isLoading: boolean;
}

export const LoadingContentSpinner = ({
  isLoading,
  children,
}: PropsWithChildren<LoadingContentSpinnerProps>) => {
  return isLoading ? (
    <span className="loading loading-spinner" />
  ) : (
    <>{children}</>
  );
};
