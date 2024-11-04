import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AdminTablePassangersLinkProps {
  href: string;
}

export const AdminTablePassangersLink = ({
  href,
}: AdminTablePassangersLinkProps) => {
  return (
    <a href={href} className="btn btn-sm flex grow lg:btn-md">
      <UserIcon className="size-4 lg:size-6" />
      <span className="hidden lg:inline-block">Passangers</span>
    </a>
  );
};
