import { Checkbox, Field, Input, Label } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BasicListbox } from "../forms/widgets/BasicListbox";

interface RoomsBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  hideFullRooms: boolean;
  onHideFullRoomsChange: (hide: boolean) => void;
  sortRoomsBy: RoomsSortBy;
  onSortRoomsByChange: (sortBy: RoomsSortBy) => void;
}

export type RoomsSortBy = "roomNumber" | "fullness";

export const RoomsBar = ({
  searchText,
  onSearchTextChange,
  hideFullRooms,
  onHideFullRoomsChange,
  sortRoomsBy,
  onSortRoomsByChange,
}: RoomsBarProps) => {
  return (
    <div className="mb-6 flex flex-col items-center gap-x-8 gap-y-4 lg:flex-row lg:items-stretch lg:justify-center">
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
          onChange={(newValue) => onSortRoomsByChange(newValue as RoomsSortBy)}
          multiple={false}
        />
      </Field>
    </div>
  );
};
