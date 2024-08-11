import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Input } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { CustomDialog } from "../CustomDialog";

interface OrganizationAddDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
  selectOption: (organizationId: string) => void;
}

export const OrganizationAddDialog = ({
  dialogOpen,
  closeDialog,
  selectOption,
}: OrganizationAddDialogProps) => {
  const [organizationToAdd, setOrganizationToAdd] = useState("");

  const queryClient = useQueryClient();
  const addOrgMutation = useMutation({
    mutationFn: (newOrgName: string) =>
      zosiaApi.post(zosiaApiRoutes.organizations, { name: newOrgName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [zosiaApiRoutes.organizations],
      });
      closeDialog();
      setOrganizationToAdd("");
      selectOption(data.data["id"]);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (organizationToAdd !== "") {
      addOrgMutation.mutate(organizationToAdd);
    }
  };

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      onClose={closeDialog}
      title="Add organization"
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="input input-bordered w-full"
          value={organizationToAdd}
          onChange={(e) => setOrganizationToAdd(e.target.value)}
          autoFocus
        />

        <button
          className="btn btn-primary btn-block mt-3"
          type="submit"
          disabled={addOrgMutation.isPending}
        >
          {addOrgMutation.isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>Add organization</span>
          )}
        </button>

        {addOrgMutation.isError && (
          <p className="mt-2 text-error">
            Error:{" "}
            {((addOrgMutation.error as AxiosError)?.response as AxiosResponse)
              ?.data["name"]?.[0] ?? addOrgMutation.error.message}
          </p>
        )}
      </form>
    </CustomDialog>
  );
};
