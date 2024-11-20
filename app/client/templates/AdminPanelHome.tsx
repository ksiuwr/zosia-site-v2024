import { AdminNavBar } from "@client/components/admin/AdminNavBar";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import React from "react";

export const Template = () => {
  return (
    <Layout>
      <PageTitle>Admin Panel</PageTitle>
      <CenteredContentContainer>
        <div className="mb-6">
          <AdminNavBar />
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
