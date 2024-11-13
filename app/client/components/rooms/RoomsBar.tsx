import { Checkbox, Field, Input, Label } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { BasicListbox } from "../forms/widgets/BasicListbox";

import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
import { reverse } from "@reactivated";
import { RoomPropertiesDialog } from "./admin/RoomPropertiesDialog";

interface RoomsBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  hideFullRooms: boolean;
  onHideFullRoomsChange: (hide: boolean) => void;
  sortRoomsBy: RoomsSortBy;
  onSortRoomsByChange: (sortBy: RoomsSortBy) => void;

  isAdmin?: boolean;
}

export type RoomsSortBy = "roomNumber" | "fullness";

export const RoomsBar = ({
  searchText,
  onSearchTextChange,
  hideFullRooms,
  onHideFullRoomsChange,
  sortRoomsBy,
  onSortRoomsByChange,
  isAdmin,
}: RoomsBarProps) => {
  const [addRoomDialogOpen, setAddRoomDialogOpen] = useState(false);

  return (
    <div className="mx-auto mb-6 flex w-fit flex-col gap-y-4">
      <div className="flex flex-col items-center gap-x-8 gap-y-4 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center">
        <Field
          as="label"
          className="input input-bordered flex items-center gap-x-2"
        >
          <Input
            type="text"
            className="grow"
            placeholder="Search rooms"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
          />
          <MagnifyingGlassIcon className="size-6" />
        </Field>

        <Field className="flex items-center">
          <Label className="pr-3">Hide full rooms</Label>
          <Checkbox
            className="checkbox size-8 data-[checked]:checkbox-success"
            checked={hideFullRooms}
            onChange={onHideFullRoomsChange}
          />
        </Field>

        <Field className="flex items-center">
          <Label className="whitespace-nowrap pr-3">Sort by</Label>
          <BasicListbox
            name="sortRoomsBy"
            value={sortRoomsBy}
            optgroups={[
              { value: "roomNumber", label: "Room number" },
              { value: "fullness", label: "Fullness" },
            ]}
            onChange={(newValue) =>
              onSortRoomsByChange(newValue as RoomsSortBy)
            }
            multiple={false}
          />
        </Field>
      </div>
      {isAdmin && (
        <div className="flex w-full justify-between gap-x-2">
          <button
            className="btn btn-success grow"
            onClick={() => setAddRoomDialogOpen(true)}
          >
            <PlusIcon className="size-6" /> Add room
          </button>
          <a className="btn btn-info grow" href={reverse("rooms_import")}>
            <ArrowUpTrayIcon className="size-6" />
            Import rooms
          </a>
          <RoomPropertiesDialog
            dialogOpen={addRoomDialogOpen}
            onClose={() => setAddRoomDialogOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
