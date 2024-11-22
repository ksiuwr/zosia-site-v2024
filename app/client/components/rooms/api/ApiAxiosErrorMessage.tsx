import { AxiosError } from "axios";
import parse from "html-react-parser";
import React from "react";

interface ApiAxiosErrorMessageProps {
  axiosError: AxiosError;
}

export const ApiAxiosErrorMessage = ({
  axiosError,
}: ApiAxiosErrorMessageProps) => {
  const responseData = axiosError.response?.data;

  if (typeof responseData === "string") {
    return <p>{parse(responseData)}</p>;
  }

  if (typeof responseData === "object" && responseData !== null) {
    return (
      <p>
        <ul>
          {Object.entries(responseData).map((error) => {
            let errorValue = "";

            if (Array.isArray(error[1])) {
              errorValue = error[1].join(", ");
            } else if (typeof error[1] === "string") {
              errorValue = error[1];
            } else {
              errorValue = JSON.stringify(error[1]);
            }

            return (
              <li key={error[0]}>
                <span>
                  <strong>{error[0]}:</strong> {errorValue}
                </span>
                <br />
              </li>
            );
          })}
        </ul>
      </p>
    );
  }

  return <p>There was an internal error with your request.</p>;
};
