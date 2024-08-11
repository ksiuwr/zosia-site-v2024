import { Alert } from "@client/components/alert/Alert";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
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

        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm my-6 table-fixed lg:table-lg">
            <thead>
              <tr>
                <th className="w-6/12">Name</th>
                <th className="w-2/12">Votes</th>
                <th className="w-4/12">State</th>
              </tr>
            </thead>
            <tbody>
              {props.boardgames.map((boardgame) => (
                <tr key={boardgame.url}>
                  <td className="overflow-x-clip">
                    <a href={boardgame.url} className="link font-bold">
                      {boardgame.name}
                    </a>
                  </td>
                  <td className="overflow-x-clip">
                    {
                      props.votes.find((vote) => vote.name === boardgame.name)
                        ?.votes
                    }
                  </td>
                  <td className="overflow-x-clip">
                    {boardgame.accepted ? (
                      <div className="flex gap-x-2">
                        <CheckCircleIcon className="size-5 lg:size-6" />
                        <span>Accepted</span>
                      </div>
                    ) : (
                      `Suggested by ${boardgame.user.first_name} ${boardgame.user.last_name}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CenteredContentContainer>
    </Layout>
  );
};
