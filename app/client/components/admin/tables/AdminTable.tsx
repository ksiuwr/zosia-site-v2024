import React, { PropsWithChildren } from "react";

interface AdminTableProps {
  headerNames: string[];
}

export const AdminTable = ({
  headerNames,
  children,
}: PropsWithChildren<AdminTableProps>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra my-6 lg:table-lg">
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
    </div>
  );
};
