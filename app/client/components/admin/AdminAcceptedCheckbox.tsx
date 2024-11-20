import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AdminTableCheckbox } from "./tables/AdminTableCheckbox";

interface AdminAcceptedCheckboxProps {
  id: number;
  initialIsAccepted: boolean;
  apiRoute: string;
  errorMessage: string;
}

export const AdminAcceptedCheckbox = ({
  id,
  initialIsAccepted,
  apiRoute,
  errorMessage,
}: AdminAcceptedCheckboxProps) => {
  const [isActive, setIsActive] = useState(initialIsAccepted);

  const toggleAcceptedMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<{ msg: string; isAccepted: boolean }>(
        apiRoute,
        {
          key: id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data) => {
      setIsActive(data.data.isAccepted);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast("error", errorMessage);
      console.error(error);
    },
  });

  return (
    <AdminTableCheckbox
      isChecked={isActive}
      isPending={toggleAcceptedMutation.isPending}
      onToggle={toggleAcceptedMutation.mutate}
    />
  );
};
