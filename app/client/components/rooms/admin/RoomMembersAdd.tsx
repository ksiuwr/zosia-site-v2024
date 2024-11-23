import { RoomMember } from "@client/utils/roomData";
import { UserApiData } from "@client/utils/userData";
import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useState } from "react";

interface RoomMembersAddProps {
  members: RoomMember[];
  addMember: (memberId: number) => void;
}

export const RoomMembersAdd = ({ members, addMember }: RoomMembersAddProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await zosiaApi.get<[UserApiData]>(zosiaApiRoutes.users);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError) {
    return <div className="text-error">Error: {error.message}</div>;
  }

  const filteredUsers =
    searchQuery === ""
      ? data
      : data.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        );

  const isUserAlreadyMember = (userId: number) => {
    return members.some((member) => member.id === userId);
  };

  const onChange = (user?: UserApiData) => {
    if (user) {
      addMember(user.id);
    }
    setSearchQuery("");
  };

  return (
    <Combobox onChange={onChange} onClose={() => setSearchQuery("")}>
      <div className="relative">
        <ComboboxInput
          onChange={(event) => setSearchQuery(event.target.value)}
          className="input input-bordered w-full"
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4" />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor="bottom"
        className={clsx(
          "w-[var(--input-width)] rounded-box bg-base-300 [--anchor-padding:1.5rem]",
        )}
      >
        {filteredUsers.map((user) => (
          <ComboboxOption
            key={user.id}
            value={user}
            className={clsx(
              "group btn no-animation btn-block flex flex-nowrap justify-start rounded-none text-start font-normal data-[focus]:btn-active",
              isUserAlreadyMember(user.id) && "btn-success",
            )}
          >
            {user.first_name} {user.last_name}
            <CheckIcon
              className={clsx(
                "size-6",
                isUserAlreadyMember(user.id) ? "inline-block" : "hidden",
              )}
            />
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
