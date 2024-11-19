import { PlusIcon } from "@heroicons/react/24/solid";
import React, { PropsWithChildren } from "react";

interface AdminTableProps {
  headerNames: string[];
  addEntryLink?: {
    href: string;
    label: string;
  };
}

export const AdminTable = ({
  headerNames,
  addEntryLink,
  children,
}: PropsWithChildren<AdminTableProps>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-sm my-6 lg:table-lg">
        <thead>
          <tr>
            {headerNames.map((headerName) => (
              <th key={headerName} className="whitespace-pre-wrap">
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {addEntryLink && (
        <a
          href={addEntryLink.href}
          className="btn btn-success btn-block lg:btn-lg"
        >
          <PlusIcon className="size-6" />
          <span>{addEntryLink.label}</span>
        </a>
      )}
    </div>
  );
};
