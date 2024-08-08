import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsSelect } from "reactivated/dist/generated";

interface OrganizationSelectorSelectProps {
  field: WidgetHandler<DjangoFormsWidgetsSelect>;
}

interface Organization {
  id: string;
  name: string;
  accepted: boolean;
  user?: {
    first_name: string;
    last_name: string;
  };
}

export const OrganizationSelectorSelect = ({
  field,
}: OrganizationSelectorSelectProps) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [zosiaApiRoutes.organizations],
    queryFn: () =>
      zosiaApi.get(zosiaApiRoutes.organizations).then((res) => res.data),
    initialData: field.widget.optgroups
      .map((optgroup) => {
        return {
          id: (optgroup[1][0].value ?? "").toString(),
          name: optgroup[1][0].label,
          accepted: true,
        };
      })
      .filter((org) => org.id !== ""),
    // With SSR, set staleTime above 0 to avoid refetching immediately on the client
    staleTime: 60 * 1000,
  });

  if (isPending)
    return (
      <Select className="select select-bordered skeleton w-full" disabled>
        <option>Loading...</option>
      </Select>
    );

  if (isError)
    return (
      <Select className="select select-bordered w-full" disabled>
        <option>Error: {error.message}</option>
      </Select>
    );

  const organizations = data as Organization[];

  return (
    <Select
      name={field.name}
      className="select select-bordered w-full"
      required={field.widget.required}
      value={field.value ?? ""}
      onChange={(e) => field.handler(e.target.value)}
    >
      <option value={""}>---------</option>
      {organizations.map((organization) => (
        <option key={organization.id} value={organization.id}>
          {organization.accepted
            ? organization.name
            : `${organization.name} (${organization.user?.first_name} ${organization.user?.last_name})`}
        </option>
      ))}
    </Select>
  );
};
