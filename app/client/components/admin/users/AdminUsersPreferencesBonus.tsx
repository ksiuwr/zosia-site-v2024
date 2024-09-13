import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Input } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface AdminUsersPreferencesBonusProps {
  minBonusMinutes: number;
  maxBonusMinutes: number;
  bonusStep: number;

  userPreferencesId: number;
  changeBonusCommand: string;

  bonusValue: number;
  onBonusChange: (userPreferencesId: number, newBonusValue: number) => void;
}

export const AdminUsersPreferencesBonus = ({
  minBonusMinutes,
  maxBonusMinutes,
  bonusStep,

  userPreferencesId,
  changeBonusCommand,

  bonusValue,
  onBonusChange,
}: AdminUsersPreferencesBonusProps) => {
  const [uiBonusValue, setUiBonusValue] = useState(bonusValue);

  const changeBonusMutation = useMutation({
    mutationFn: async (newBonus: number) => {
      return await zosiaApi.post<{ msg: string; bonus: number }>(
        zosiaApiRoutes.adminUserPreferencesEdit,
        {
          key: userPreferencesId,
          bonus: newBonus,
          command: changeBonusCommand,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data) => {
      onBonusChange(userPreferencesId, data.data.bonus);
      setUiBonusValue(data.data.bonus);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast("error", "Error while changing bonus.");
      console.error(error);
      setUiBonusValue(bonusValue);
    },
  });

  return (
    <div className="flex flex-col gap-y-1">
      <span>Bonus: {uiBonusValue} min</span>
      {changeBonusMutation.isPending ? (
        <span className="loading loading-spinner mx-auto h-5"></span>
      ) : (
        <Input
          type="range"
          min={minBonusMinutes}
          max={maxBonusMinutes}
          step={bonusStep}
          value={uiBonusValue}
          onChange={(e) => setUiBonusValue(parseInt(e.target.value))}
          className="range range-primary range-xs hidden lg:range-sm lg:block"
          onMouseUp={() => {
            changeBonusMutation.mutate(uiBonusValue);
          }}
        />
      )}
    </div>
  );
};
