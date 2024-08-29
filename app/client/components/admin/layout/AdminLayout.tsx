import React, { PropsWithChildren } from "react";
import { Layout } from "../../Layout";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return <Layout showAdminSidebar>{children}</Layout>;
};
