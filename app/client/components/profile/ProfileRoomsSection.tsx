import { getLocalDateTime } from "@client/utils/time";
import React from "react";

interface ProfileRoomsSection {
  roomName?: string;
  roommate?: string;
  roomingStartTime: Date;
}

export const ProfileRoomsSection = ({
  roomName,
  roommate,
  roomingStartTime,
}: ProfileRoomsSection) => {
  return (
    <>
      <h2 className="card-title text-lg lg:text-xl">Rooms</h2>
      {roomName ? (
        <p className="prose">
          You are assigned to: <strong>{roomName}</strong>
          {roommate && (
            <>
              <br />
              <span>
                Room will be occupied by: <strong>{roommate}</strong>
              </span>
            </>
          )}
        </p>
      ) : (
        <p>
          Your rooms assignment starts at:{" "}
          <span className="font-bold">
            {getLocalDateTime(roomingStartTime)}
          </span>
        </p>
      )}
    </>
  );
};
