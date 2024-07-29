import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsSelect } from "reactivated/dist/generated";
import { BasicFormFieldWithCustomWidget } from "../forms/BasicFormFieldWithCustomWidget";
import { OrganizationSelectorSelect } from "./OrganizationSelectorSelect";

interface OrganizationSelectorProps {
  field: WidgetHandler<DjangoFormsWidgetsSelect>;
}

export const OrganizationSelector = ({ field }: OrganizationSelectorProps) => {
  return (
    <BasicFormFieldWithCustomWidget field={field}>
      <OrganizationSelectorSelect field={field} />
    </BasicFormFieldWithCustomWidget>
  );
};
