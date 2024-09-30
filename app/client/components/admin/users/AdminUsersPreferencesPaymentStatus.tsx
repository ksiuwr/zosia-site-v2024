import React from "react";
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

  if (togglePaymentAcceptedMutation.isPending) {
    return <span className="loading loading-spinner size-5 lg:size-7"></span>;
  }

  return (
    <input
      type="checkbox"
      className={`checkbox mx-auto size-5 checked:checkbox-success lg:size-7`}
      checked={paymentAccepted}
      onChange={() => togglePaymentAcceptedMutation.mutate(userPreferencesId)}
    />
  );
};
