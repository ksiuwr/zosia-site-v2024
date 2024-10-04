import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AdminTableCheckbox } from "../tables/AdminTableCheckbox";

interface AdminSponsorsActiveCheckboxProps {
  sponsorId: number;
  initialIsActive: boolean;
}

export const AdminSponsorsActiveCheckbox = ({
  sponsorId,
  initialIsActive,
}: AdminSponsorsActiveCheckboxProps) => {
  const [isActive, setIsActive] = useState(initialIsActive);

  const toggleSponsorActiveMutation = useMutation({
    mutationFn: async () => {
      return await zosiaApi.post<{ msg: string; isActive: boolean }>(
        zosiaApiRoutes.adminSponsorToggleActive,
        {
          key: sponsorId,
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
      showCustomToast("error", "Error while toggling sponsor active state.");
      console.error(error);
    },
  });

  return (
    <AdminTableCheckbox
      isChecked={isActive}
      isPending={toggleSponsorActiveMutation.isPending}
      onToggle={() => toggleSponsorActiveMutation.mutate()}
    />
  );
};
