import { showCustomToast } from "@client/components/CustomToast";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { useMutation } from "@tanstack/react-query";

export const useTogglePaymentAcceptedMutation = (
  togglePaymentAcceptedCommandName: string,
  onPaymentAcceptedChange: (
    userPreferencesId: number,
    newPaymentAccepted: boolean,
  ) => void,
) => {
  return useMutation({
    mutationFn: async (userPreferencesId: number) => {
      return await zosiaApi.post<{ msg: string; status: boolean }>(
        zosiaApiRoutes.adminUserPreferencesEdit,
        {
          key: userPreferencesId,
          command: togglePaymentAcceptedCommandName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data, userPreferencesId) => {
      onPaymentAcceptedChange(userPreferencesId, data.data.status);
      showCustomToast("success", data.data.msg);
    },
    onError: (error) => {
      showCustomToast("error", "Error while changing bonus.");
      console.error(error);
    },
  });
};

export const useChangeBonusMutation = (
  changeBonusCommandName: string,
  onBonusChange: (userPreferencesId: number, newBonusValue: number) => void,
  onSuccessCallback?: (bonus: number) => void,
  onErrorCallback?: () => void,
) => {
  return useMutation({
    mutationFn: async ({
      userPreferencesId,
      newBonus,
    }: {
      userPreferencesId: number;
      newBonus: number;
    }) => {
      return await zosiaApi.post<{ msg: string; bonus: number }>(
        zosiaApiRoutes.adminUserPreferencesEdit,
        {
          key: userPreferencesId,
          bonus: newBonus,
          command: changeBonusCommandName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (data, { userPreferencesId }) => {
      onBonusChange(userPreferencesId, data.data.bonus);
      showCustomToast("success", data.data.msg);

      if (onSuccessCallback) {
        onSuccessCallback(data.data.bonus);
      }
    },
    onError: (error) => {
      showCustomToast("error", "Error while changing bonus.");
      console.error(error);

      if (onErrorCallback) {
        onErrorCallback();
      }
    },
  });
};
