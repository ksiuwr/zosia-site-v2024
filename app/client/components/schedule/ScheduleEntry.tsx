import clsx from "clsx";
import React from "react";
import { CustomDisclosure } from "../CustomDisclosure";

interface ScheduleEntryProps {
  startTime: string;
  duration: string;
  title: string;
  lecturer?: string;
  organization?: string;
  abstract?: string[];
  highlight: boolean;
}

export const ScheduleEntry = ({
  startTime,
  duration,
  title,
  lecturer,
  organization,
  abstract,
  highlight = false,
}: ScheduleEntryProps) => {
  const buttonLabel = `${startTime} | ${duration} | ${title} ${
    lecturer ? `| ${lecturer}` : ""
  } ${organization ? `(${organization})` : ""}`;

  const panelContent = abstract?.join("\n") || "";

  return (
    <div
      className={clsx(
        "mx-auto my-1 w-full rounded-lg even:bg-base-200",
        highlight && "!bg-warning !text-warning-content",
      )}
    >
      {panelContent ? (
        <CustomDisclosure
          buttonLabel={buttonLabel}
          panelContent={panelContent}
        />
      ) : (
        <div className="w-full cursor-default p-6 text-start font-normal lg:text-lg">
          {buttonLabel}
        </div>
      )}
    </div>
  );
};
