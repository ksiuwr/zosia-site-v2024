import axios from "axios";
import React from "react";
import { ApiAxiosErrorMessage } from "./ApiAxiosErrorMessage";

interface ApiErrorMessageProps {
  error: Error;
}

export const ApiErrorMessage = ({ error }: ApiErrorMessageProps) => {
  if (axios.isAxiosError(error)) {
    return <ApiAxiosErrorMessage axiosError={error} />;
  }

  return <p>{error.message}</p>;
};
