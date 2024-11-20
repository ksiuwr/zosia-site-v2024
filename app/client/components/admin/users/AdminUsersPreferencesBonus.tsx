import { Input } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useChangeBonusMutation } from "./AdminUsersMutations";

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

  const changeBonusMutation = useChangeBonusMutation(
    changeBonusCommand,
    onBonusChange,
    (bonus) => setUiBonusValue(bonus),
    () => setUiBonusValue(bonusValue),
  );

  useEffect(() => {
    // Reset UI bonus value when bonus value changes externally
    // (e.g. when a file with payments is imported)
    setUiBonusValue(bonusValue);
  }, [bonusValue]);

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
            changeBonusMutation.mutate({
              userPreferencesId,
              newBonus: uiBonusValue,
            });
          }}
        />
      )}
    </div>
  );
};
