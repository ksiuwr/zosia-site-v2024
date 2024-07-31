import React, { useState } from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsSelect } from "reactivated/dist/generated";
import { BasicFormFieldWithCustomWidget } from "../forms/BasicFormFieldWithCustomWidget";
import { OrganizationAddDialog } from "./OrganizationAddDialog";
import { OrganizationSelectorSelect } from "./OrganizationSelectorSelect";

interface OrganizationSelectorProps {
  field: WidgetHandler<DjangoFormsWidgetsSelect>;
}

export const OrganizationSelector = ({ field }: OrganizationSelectorProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const selectOption = (organizationId: string) =>
    field.handler(organizationId);

  return (
    <>
      <BasicFormFieldWithCustomWidget field={field}>
        <OrganizationSelectorSelect field={field} />
        <button
          className="btn btn-block mt-2"
          type="button"
          onClick={openDialog}
          disabled={field.disabled}
        >
          Add organization
        </button>
      </BasicFormFieldWithCustomWidget>

      <OrganizationAddDialog
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        selectOption={selectOption}
      />
    </>
  );
};
