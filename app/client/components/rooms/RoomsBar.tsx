import { Checkbox, Field, Input, Label, Select } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

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
        <Label className="pr-3">Sort by</Label>
        <Select
          className="select select-bordered"
          value={sortRoomsBy}
          onChange={(e) => onSortRoomsByChange(e.target.value as RoomsSortBy)}
        >
          <option value="roomNumber">Room number</option>
          <option value="fullness">Fullness</option>
        </Select>
      </Field>
    </div>
  );
};
