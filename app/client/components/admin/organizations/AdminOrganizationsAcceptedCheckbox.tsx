import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AdminTableCheckbox } from "../tables/AdminTableCheckbox";

interface AdminOrganizationsAcceptedCheckboxProps {
  organizationId: number;
  initialIsAccepted: boolean;
}

export const AdminOrganizationsAcceptedCheckbox = ({
  organizationId,
  initialIsAccepted,
}: AdminOrganizationsAcceptedCheckboxProps) => {
  const [isAccepted, setIsAccepted] = useState(initialIsAccepted);

  const toggleLectureAcceptedMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<{ msg: string; isAccepted: boolean }>(
        zosiaApiRoutes.adminOrganizationsToggleAccept,
        {
          key: organizationId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data) => {
      setIsAccepted(data.data.isAccepted);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast(
        "error",
        "Error while toggling organization accepted state.",
      );
      console.error(error);
    },
  });

  return (
    <AdminTableCheckbox
      isChecked={isAccepted}
      isPending={toggleLectureAcceptedMutation.isPending}
      onToggle={toggleLectureAcceptedMutation.mutate}
    />
  );
};
