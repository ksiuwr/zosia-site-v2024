import React from "react";
import { AdminTableCheckbox } from "../tables/AdminTableCheckbox";
import { useTogglePaymentAcceptedMutation } from "./AdminUsersMutations";

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
  const togglePaymentAcceptedMutation = useTogglePaymentAcceptedMutation(
    togglePaymentAcceptedCommand,
    onPaymentAcceptedChange,
  );

  return (
    <AdminTableCheckbox
      isChecked={paymentAccepted}
      isPending={togglePaymentAcceptedMutation.isPending}
      onToggle={() => togglePaymentAcceptedMutation.mutate(userPreferencesId)}
    />
  );
};
