import { Alert } from "@client/components/alert/Alert";
import { BoardgamesTable } from "@client/components/boardgames/BoardgamesTable";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { reverse, templates } from "@reactivated";
import clsx from "clsx";
import React from "react";

export const Template = (props: templates.BoardgamesMyGames) => {
  return (
    <Layout>
      <PageTitle>My Boardgames</PageTitle>
      <CenteredContentContainer>
        <a
          href={reverse("boardgames_index")}
          className="btn btn-outline btn-block mb-4"
        >
          <ArrowLeftIcon className="size-6" /> Back to boardgames
        </a>

        {!props.can_add && (
          <Alert type="info">
            {
              "You've already added three boardgames. Remove some to add a new one."
            }
          </Alert>
        )}

        <BoardgamesTable
          boardgames={props.user_boardgames}
          votes={props.votes}
          showDeleteButton
        />

        <a
          href={reverse("boardgames_create")}
          className={clsx(
            "btn btn-primary btn-lg btn-block mb-6",
            !props.can_add && "btn-disabled",
          )}
        >
          Add boardgame {`(${props.user_boardgames.length}/3)`}
        </a>
      </CenteredContentContainer>
    </Layout>
  );
};
