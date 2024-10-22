import React, { PropsWithChildren } from "react";

interface LoadingContentSpinnerProps {
  isLoading: boolean;
}

export const LoadingContentSpinner = ({
  isLoading,
  children,
}: PropsWithChildren<LoadingContentSpinnerProps>) => {
  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  } else {
    return children;
  }
};
