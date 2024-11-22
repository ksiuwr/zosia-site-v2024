import { Alert } from "@client/components/alert/Alert";
import { BackToBoardgamesLink } from "@client/components/boardgames/BackToBoardgamesLink";
import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { CSRFToken, reverse, templates } from "@reactivated";
import React, { useState } from "react";

export const Template = (props: templates.BoardgamesVote) => {
  const [votes, setVotes] = useState(props.boardgame_ids_vote_for);

  const onCheckboxChange = (boardGameId: number, checked: boolean) => {
    if (checked) {
      setVotes((oldVotes) => [...oldVotes, boardGameId]);
    } else {
      setVotes((oldVotes) => oldVotes.filter((vote) => vote !== boardGameId));
    }
  };

  const isVoteLimitReached = votes.length >= 3;

  return (
    <Layout>
      <PageTitle>Vote for boardgames</PageTitle>
      <CenteredContentContainer>
        <Alert type="info">
          You can vote for up to three boardgames. Choose your favourite ones :)
        </Alert>

        <div className="mb-6 mt-4">
          {props.boardgames.map((boardgame) => (
            <label key={boardgame.id} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className={`checkbox my-2 block size-8 checked:checkbox-success`}
                checked={votes.includes(boardgame.id)}
                onChange={(e) => {
                  onCheckboxChange(boardgame.id, e.target.checked);
                }}
                disabled={isVoteLimitReached && !votes.includes(boardgame.id)}
              />
              <a href={boardgame.url} className="link">
                {boardgame.name}
              </a>
            </label>
          ))}
        </div>

        <form method="post" action={reverse("vote_edit")}>
          <CSRFToken />
          <input type="hidden" name="new_ids" value={JSON.stringify(votes)} />
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Save votes
          </button>
        </form>

        <BackToBoardgamesLink />
      </CenteredContentContainer>
    </Layout>
  );
};
