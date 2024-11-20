import { Alert } from "@client/components/alert/Alert";
import { BoardgamesTable } from "@client/components/boardgames/BoardgamesTable";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { HandThumbUpIcon, PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { reverse, templates } from "@reactivated";
import React from "react";

const ICON_CSS = "size-6 lg:size-8";

export const Template = (props: templates.BoardgamesHome) => {
  return (
    <Layout>
      <PageTitle>Boardgames</PageTitle>
      <CenteredContentContainer>
        {props.paid ? (
          <div className="join flex justify-evenly lg:flex-row">
            <a
              className="btn btn-outline join-item h-fit w-1/2 grow flex-col py-4"
              href={reverse("my_boardgames")}
            >
              <PuzzlePieceIcon className={ICON_CSS} />
              My Boardgames
            </a>
            <a
              className="btn btn-outline join-item h-fit w-1/2 grow flex-col py-4"
              href={reverse("boardgames_vote")}
            >
              <HandThumbUpIcon className={ICON_CSS} />
              Vote
            </a>
          </div>
        ) : (
          <Alert type="info">
            To add and vote for boardgames your payment must be accepted first.
          </Alert>
        )}

        <BoardgamesTable boardgames={props.boardgames} votes={props.votes} />
      </CenteredContentContainer>
    </Layout>
  );
};
