import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { reverse } from "@reactivated";
import React, { PropsWithChildren } from "react";
import { Layout } from "../../Layout";
import { AdminCenteredContainer } from "./AdminCenteredContainer";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout showAdminSidebar>
      <AdminCenteredContainer>
        <a
          className="btn btn-outline btn-block mt-4 lg:hidden"
          href={reverse("admin")}
        >
          <ArrowLeftIcon className="size-6" /> Back to admin panel
        </a>
      </AdminCenteredContainer>
      {children}
    </Layout>
  );
};
