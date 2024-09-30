import { Alert } from "@client/components/alert/Alert";
import { BackToBoardgamesLink } from "@client/components/boardgames/BackToBoardgamesLink";
import { BoardgamesTable } from "@client/components/boardgames/BoardgamesTable";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import clsx from "clsx";
import React from "react";

export const Template = (props: templates.BoardgamesMyGames) => {
  return (
    <Layout>
      <PageTitle>My Boardgames</PageTitle>
      <CenteredContentContainer>
        <Alert type="info">
          {props.can_add
            ? "You can propose up to three boardgames. The most popular ones will be available during the conference."
            : "You've already added three boardgames. Remove some to add a new one."}
        </Alert>

        <BoardgamesTable
          boardgames={props.user_boardgames}
          votes={props.votes}
          showDeleteButton
        />

        <a
          href={reverse("boardgames_create")}
          className={clsx(
            "btn btn-primary btn-lg btn-block",
            !props.can_add && "btn-disabled",
          )}
        >
          Add boardgame {`(${props.user_boardgames.length}/3)`}
        </a>

        <BackToBoardgamesLink />
      </CenteredContentContainer>
    </Layout>
  );
};
