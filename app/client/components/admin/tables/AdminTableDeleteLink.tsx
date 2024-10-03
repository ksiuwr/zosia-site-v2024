import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AdminTableDeleteLinkProps {
  href: string;
}

export const AdminTableDeleteLink = ({ href }: AdminTableDeleteLinkProps) => {
  return (
    <a href={href} className="btn btn-error btn-sm flex grow lg:btn-md">
      <TrashIcon className="size-4 lg:size-6" />
      <span className="hidden lg:inline-block">Delete</span>
    </a>
  );
};
