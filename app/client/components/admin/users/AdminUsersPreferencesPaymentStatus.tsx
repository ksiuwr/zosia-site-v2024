import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface AdminUsersPreferencesPaymentStatus {
  userPreferencesId: number;
  togglePaymentAcceptedCommand: string;

  paymentAccepted: boolean;
  onPaymentAcceptedChange: (
    userPreferencesId: number,
    newPaymentAccepted: boolean,
  ) => void;
}

export const AdminUsersPreferencesPaymentStatus = ({
  userPreferencesId,
  togglePaymentAcceptedCommand,
  paymentAccepted,
  onPaymentAcceptedChange,
}: AdminUsersPreferencesPaymentStatus) => {
  const changePaymentAcceptedMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<{ msg: string; status: boolean }>(
        zosiaApiRoutes.adminUserPreferencesEdit,
        {
          key: userPreferencesId,
          command: togglePaymentAcceptedCommand,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data) => {
      onPaymentAcceptedChange(userPreferencesId, data.data.status);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast("error", "Error while changing bonus.");
      console.error(error);
    },
  });

  if (changePaymentAcceptedMutation.isPending) {
    return <span className="loading loading-spinner size-5 lg:size-7"></span>;
  }

  return (
    <input
      type="checkbox"
      className={`checkbox mx-auto size-5 checked:checkbox-success lg:size-7`}
      checked={paymentAccepted}
      onChange={() => changePaymentAcceptedMutation.mutate()}
    />
  );
};
