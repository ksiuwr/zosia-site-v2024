import { AlertType } from "@client/components/alert/Alert";
import { CustomToast } from "@client/components/CustomToast";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { apiErrorMessageHTML } from "./zosiaApi";

export const customToast = (message: string, levelTag: AlertType) => {
  toast.custom((t) => (
    <CustomToast
      isToastVisible={t.visible}
      levelTag={levelTag}
      message={message}
    />
  ));
};

export const successToast = (message: string) =>
  customToast(message, "success");

export const errorToast = (message: string) => {
  customToast(message, "error");
};

export const apiErrorToast = (error: Error) => {
  if (axios.isAxiosError(error)) {
    errorToast(apiErrorMessageHTML(error));
  } else {
    errorToast(error.message);
  }
};
