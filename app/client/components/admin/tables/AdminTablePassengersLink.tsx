import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AdminTablePassengersLinkProps {
  href: string;
}

export const AdminTablePassengersLink = ({
  href,
}: AdminTablePassengersLinkProps) => {
  return (
    <a href={href} className="btn btn-sm flex grow lg:btn-md">
      <UserIcon className="size-4 lg:size-6" />
      <span className="hidden lg:inline-block">Passengers</span>
    </a>
  );
};
