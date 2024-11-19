import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AdminTableCheckbox } from "../tables/AdminTableCheckbox";

interface AdminLecturesAcceptedCheckboxProps {
  lectureId: number;
  initialIsActive: boolean;
}

export const AdminLecturesAcceptedCheckbox = ({
  lectureId,
  initialIsActive,
}: AdminLecturesAcceptedCheckboxProps) => {
  const [isActive, setIsActive] = useState(initialIsActive);

  const toggleLectureAcceptedMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<{ msg: string; isActive: boolean }>(
        zosiaApiRoutes.adminLecturesToggleAccept,
        {
          key: lectureId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data) => {
      setIsActive(data.data.isActive);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast("error", "Error while toggling lecture accepted state.");
      console.error(error);
    },
  });

  return (
    <AdminTableCheckbox
      isChecked={isActive}
      isPending={toggleLectureAcceptedMutation.isPending}
      onToggle={toggleLectureAcceptedMutation.mutate}
    />
  );
};
