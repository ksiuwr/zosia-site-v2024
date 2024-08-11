import React from "react";
import { BoardgameDelete } from "./BoardgameDelete";
import { BoardgameState } from "./BoardgameState";

interface BoardgamesTableProps {
  boardgames: {
    id: number;
    url: string;
    name: string;
    accepted: boolean;
    user?: {
      first_name: string;
      last_name: string;
    };
  }[];
  votes: {
    name: string;
    votes: number;
  }[];

  showDeleteButton?: boolean;
}

export const BoardgamesTable = ({
  boardgames,
  votes,
  showDeleteButton,
}: BoardgamesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-md my-6 table-fixed lg:table-lg">
        <thead>
          <tr>
            <th className="w-6/12">Name</th>
            <th className="w-2/12">Votes</th>
            <th className="w-4/12">{showDeleteButton ? "Action" : "State"}</th>
          </tr>
        </thead>
        <tbody>
          {boardgames.map((boardgame) => (
            <tr key={boardgame.id}>
              <td className="overflow-x-clip">
                <a href={boardgame.url} className="link font-bold">
                  {boardgame.name}
                </a>
              </td>
              <td className="overflow-x-clip">
                {votes.find((vote) => vote.name === boardgame.name)?.votes}
              </td>
              <td className="overflow-x-clip">
                {showDeleteButton ? (
                  <BoardgameDelete
                    boardgameName={boardgame.name}
                    boardgameId={boardgame.id}
                  />
                ) : (
                  <BoardgameState
                    accepted={boardgame.accepted}
                    firstName={boardgame.user?.first_name}
                    lastName={boardgame.user?.last_name}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
