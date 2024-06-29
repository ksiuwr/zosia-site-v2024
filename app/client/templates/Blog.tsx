import { Card } from "@client/components/Card";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { getLocalDateTime } from "@client/utils/time";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Blog) => {
  return (
    <Layout>
      <PageTitle>Blog</PageTitle>
      <div>
        {props.posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            content={post.content}
            authors={[
              `${post.author?.first_name ?? ""} ${post.author?.last_name ?? ""}`,
            ]}
            description={getLocalDateTime(new Date(post.publication))}
          />
        ))}
      </div>
    </Layout>
  );
};
