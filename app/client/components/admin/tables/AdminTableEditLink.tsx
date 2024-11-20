import { PencilIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AdminTableEditLinkProps {
  href: string;
}

export const AdminTableEditLink = ({ href }: AdminTableEditLinkProps) => {
  return (
    <a href={href} className="btn btn-info btn-sm flex grow lg:btn-md">
      <PencilIcon className="size-4 lg:size-6" />
      <span className="hidden lg:inline-block">Edit</span>
    </a>
  );
};
