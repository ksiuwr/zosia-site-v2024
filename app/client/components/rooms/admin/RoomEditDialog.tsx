import { RoomData } from "@client/utils/roomData";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import { CustomDialog } from "../../CustomDialog";
import { RoomMembersEdit } from "./RoomMembersEdit";
import { RoomPropertiesForm } from "./RoomPropertiesForm";

interface RoomEditDialogProps {
  roomData: RoomData;
  dialogOpen: boolean;
  closeDialog: () => void;
}

export const RoomEditDialog = ({
  roomData,
  dialogOpen,
  closeDialog,
}: RoomEditDialogProps) => {
  const title = "Edit room";

  return (
    <CustomDialog dialogOpen={dialogOpen} onClose={closeDialog} title={title}>
      <TabGroup>
        <TabList className="tabs tabs-bordered mb-4">
          <Tab className="tab">Room properties</Tab>
          <Tab className="tab">Members</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RoomPropertiesForm
              roomData={roomData}
              closeDialog={closeDialog}
              submitButtonLabel={title}
            />
          </TabPanel>
          <TabPanel>
            <RoomMembersEdit roomID={roomData.id} members={roomData.members} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </CustomDialog>
  );
};
