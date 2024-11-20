import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { reverse } from "@reactivated";
import React from "react";

export const BackToBoardgamesLink = () => {
  return (
    <a
      href={reverse("boardgames_index")}
      className="btn btn-outline btn-block mb-6 mt-4"
    >
      <ArrowLeftIcon className="size-6" /> Back to boardgames
    </a>
  );
};
