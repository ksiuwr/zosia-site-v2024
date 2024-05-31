import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
} from "@headlessui/react";
import React, { useContext } from "react";
import { Divider } from "../Divider";
import { SideNavLink } from "./SideNavLink";
import { Context, reverse } from "@reactivated";

export const MobileMenu = () => {
  const context = useContext(Context);

  return (
    <Popover className="lg:hidden">
      <PopoverButton className="absolute left-0 h-full">Menu</PopoverButton>
      <PopoverOverlay className="fixed inset-0 bg-black/50" />
      <PopoverPanel className="fixed left-0 top-0 h-full overflow-scroll bg-white">
        {context.is_authenticated ? (
          <>
            <SideNavLink to={reverse("accounts_profile")}>
              {context.first_name} {context.last_name}
            </SideNavLink>
            <SideNavLink to={reverse("logout")}>Log out</SideNavLink>
          </>
        ) : (
          <>
            <SideNavLink to={reverse("login")}>Log in</SideNavLink>
            <SideNavLink to={reverse("accounts_signup")}>Sign up</SideNavLink>
          </>
        )}
        <Divider />
        {context.is_staff && (
          <>
            <SideNavLink to={reverse("admin")}>Admin</SideNavLink>
            <Divider />
          </>
        )}
        {context.is_authenticated && (
          <>
            <SideNavLink to={reverse("rooms_index")}>Rooms</SideNavLink>
            <SideNavLink to={reverse("boardgames_index")}>
              Boardgames
            </SideNavLink>
            <Divider />
          </>
        )}
        <SideNavLink to={reverse("blog_index")}>Blog</SideNavLink>
        <SideNavLink to={reverse("questions_index")}>Q&A</SideNavLink>
        <SideNavLink to={reverse("lectures_index")}>Lectures</SideNavLink>
        <SideNavLink to={reverse("lectures_schedule")}>Schedule</SideNavLink>
      </PopoverPanel>
    </Popover>
  );
};
