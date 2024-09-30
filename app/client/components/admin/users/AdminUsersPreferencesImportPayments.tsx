import { UserPreferences } from "@client/templates/AdminUsersPreferences";
import clsx from "clsx";
import React, { useState } from "react";
import {
  useChangeBonusMutation,
  useTogglePaymentAcceptedMutation,
} from "./AdminUsersMutations";

interface ImportedUserPaymentInfo {
  user?: {
    hash?: string;
    firstName?: string;
    lastName?: string;
  };
  balance?: number;
}

const importedFileExample = `[
  {
    user: {
      hash: "8c4f8343",
      firstName: "Natalia",
      lastName: "Testowa3",
    },
    balance: 50,
  },
  ...
]
`;

interface ImportMessage {
  type: "success" | "error";
  message: string;
}

interface AdminUsersPreferencesImportPaymentsProps {
  findPaymentInfo: (userHash: string) => UserPreferences | undefined;

  togglePaymentAcceptedCommand: string;
  onPaymentAcceptedChange: (
    userPreferencesId: number,
    newPaymentAccepted: boolean,
  ) => void;

  changeBonusCommandName: string;
  onBonusChange: (userPreferencesId: number, newBonusValue: number) => void;

  minBonusMinutes: number;
  maxBonusMinutes: number;
  bonusStep: number;
}

export const AdminUsersPreferencesImportPayments = ({
  findPaymentInfo,
  togglePaymentAcceptedCommand,
  onPaymentAcceptedChange,
  changeBonusCommandName,
  onBonusChange,
  minBonusMinutes,
  maxBonusMinutes,
  bonusStep,
}: AdminUsersPreferencesImportPaymentsProps) => {
  const togglePaymentAcceptedMutation = useTogglePaymentAcceptedMutation(
    togglePaymentAcceptedCommand,
    onPaymentAcceptedChange,
  );

  const changeBonusMutation = useChangeBonusMutation(
    changeBonusCommandName,
    onBonusChange,
  );

  const [paymentsFile, setPaymentsFile] = useState<File>();
  const [messages, setMessages] = useState<ImportMessage[]>([]);

  const addErrorMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "error", message },
    ]);
  };

  const addSuccessMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "success", message },
    ]);
  };

  const updateBonuses = (acceptedPayments: UserPreferences[]) => {
    acceptedPayments.forEach((paymentInfo, index) => {
      const bonus = Math.max(
        Math.floor(maxBonusMinutes - bonusStep * index),
        minBonusMinutes,
      );

      changeBonusMutation.mutate({
        userPreferencesId: paymentInfo.id,
        newBonus: bonus,
      });

      addSuccessMessage(
        `Bonus for ${paymentInfo.userName} (${paymentInfo.userHash}) will be set to ${bonus} minutes.`,
      );
    });
  };

  const updatePayments = (paymentsFromFile: ImportedUserPaymentInfo[]) => {
    const acceptedPayments = [];

    for (let i = 0; i < paymentsFromFile.length; i++) {
      const importedEntry = paymentsFromFile[i];
      const paymentInfo = findPaymentInfo(importedEntry.user?.hash || "");
      if (!paymentInfo) {
        addErrorMessage(
          `Didn't find user: ${importedEntry.user?.firstName} ${importedEntry.user?.lastName} (${importedEntry.user?.hash})`,
        );
        continue;
      }

      if (paymentInfo.price == importedEntry.balance) {
        if (!paymentInfo.paymentAccepted) {
          addSuccessMessage(
            `Payment for ${paymentInfo.userName} (${paymentInfo.userHash}) will be accepted.`,
          );
          togglePaymentAcceptedMutation.mutate(paymentInfo.id);
        } else {
          addSuccessMessage(
            `${paymentInfo.userName} (${paymentInfo.userHash}) already paid.`,
          );
        }
        acceptedPayments.push(paymentInfo);
      } else {
        addErrorMessage(
          `Pay mismatch for ${paymentInfo.userName} (${paymentInfo.userHash}). Paid: ${importedEntry.balance}, price: ${paymentInfo.price}`,
        );
      }
    }
    updateBonuses(acceptedPayments);
  };

  const onFileImport = () => {
    if (!paymentsFile) {
      return;
    }

    setMessages([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || typeof e.target.result !== "string") {
        addErrorMessage(`Error reading file ${paymentsFile.name}`);
        return;
      }

      addSuccessMessage(`File ${paymentsFile.name} read successfully`);

      let payments = [];

      try {
        payments = JSON.parse(e.target.result);
      } catch (error) {
        console.error("Error parsing file", error);
        addErrorMessage(
          `Error parsing file ${paymentsFile.name} - not a valid JSON`,
        );
        return;
      }

      if (!Array.isArray(payments)) {
        addErrorMessage(
          `Error parsing file ${paymentsFile.name} - not an array`,
        );
        return;
      }

      updatePayments(payments);
    };
    reader.onerror = (e) => {
      console.error("Error reading file", e);
      addErrorMessage(`Error reading file ${paymentsFile.name}`);
    };
    reader.readAsText(paymentsFile, "UTF-8");
  };

  return (
    <div className="prose mb-6 max-w-none">
      <h2>Import payments (JSON)</h2>
      <p>Import JSON file with the following structure: </p>
      <pre>{importedFileExample}</pre>
      <input
        type="file"
        accept="application/json text/x-json"
        className="file-input file-input-bordered file-input-primary block"
        onChange={(e) => e.target.files && setPaymentsFile(e.target.files[0])}
      />
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            className={clsx(
              message.type === "success" && "text-success",
              message.type === "error" && "text-error",
            )}
          >
            {message.message}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary btn-wide mt-4" onClick={onFileImport}>
        Import
      </button>
    </div>
  );
};
