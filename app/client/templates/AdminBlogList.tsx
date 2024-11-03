import { AdminCenteredContentContainer } from "@client/components/admin/layout/AdminCenteredContentContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { PageTitle } from "@client/components/PageTitle";
import { getLocalDateTime } from "@client/utils/time";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminBlogList) => {
  return (
    <AdminLayout>
      <PageTitle>Blog posts</PageTitle>
      <AdminCenteredContentContainer>
        <AdminTable
          headerNames={["Author", "Title", "Publication date", "Actions"]}
          addEntryLink={{
            href: reverse("blog_create"),
            label: "Add blog post",
          }}
        >
          {props.posts.map((post) => (
            <tr key={post.id}>
              <td>{`${post.author?.first_name} ${post.author?.last_name}`}</td>
              <td>{post.title}</td>
              <td>{getLocalDateTime(new Date(post.publication))}</td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("blog_edit", {
                      pk: post.id,
                    })}
                  />
                </AdminTableActions>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCenteredContentContainer>
    </AdminLayout>
  );
};
