import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { RoomMember } from "@client/utils/roomData";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useRoomMutations } from "../api/RoomMutations";
import { RoomMembersAdd } from "./RoomMembersAdd";

interface RoomMembersEditProps {
  roomID: number;
  members: RoomMember[];
}

export const RoomMembersEdit = ({ roomID, members }: RoomMembersEditProps) => {
  const { joinRoomMutation, leaveRoomMutation } = useRoomMutations(roomID);

  const deleteMember = (memberId: number) => {
    leaveRoomMutation.mutate(memberId);
  };

  const addMember = (memberId: number) => {
    joinRoomMutation.mutate({ userId: memberId });
  };

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Add user to room</h2>
      <RoomMembersAdd members={members} addMember={addMember} />

      <span className="divider"></span>

      <h2 className="text-lg font-bold">Users currently in room</h2>
      <AdminTable headerNames={["Name", "Action"]}>
        {members.map((member) => (
          <tr key={member.id}>
            <td>
              {member.firstName} {member.lastName}
            </td>

            <td>
              <button
                onClick={() => deleteMember(member.id)}
                className="btn btn-error btn-sm btn-block flex lg:btn-md"
              >
                <TrashIcon className="size-4 lg:size-6" />
                <span className="hidden lg:inline-block">Remove</span>
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
};
