import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSeparator,
} from "@headlessui/react";
import React, { useContext } from "react";
import { Divider } from "../mobile/Divider";
import { TopNavDropdownLink } from "./TopNavDropdownLink";
import { TopNavLink } from "./TopNavLink";
import { Context, reverse } from "@reactivated";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const DesktopMenu = () => {
  const context = useContext(Context);

  return (
    <ul className="bg-base-300 hidden h-full items-center justify-end lg:flex">
      <TopNavLink to={reverse("blog_index")}>Blog</TopNavLink>
      <TopNavLink to={reverse("questions_index")}>Q&A</TopNavLink>
      <TopNavLink to={reverse("lectures_index")}>Lectures</TopNavLink>
      <TopNavLink to={reverse("lectures_schedule")}>Schedule</TopNavLink>
      {context.is_authenticated ? (
        <li>
          <Menu>
            <MenuButton className="btn btn-ghost">
              {context.first_name} {context.last_name}{" "}
              <ChevronDownIcon className="size-4 stroke-current [&>path]:stroke-[2]" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              as="ul"
              className="menu bg-base-200 rounded-box w-52"
            >
              <MenuItem>
                <TopNavDropdownLink to={reverse("accounts_profile")}>
                  Profile
                </TopNavDropdownLink>
              </MenuItem>
              <MenuItem>
                <TopNavDropdownLink to={reverse("boardgames_index")}>
                  Boardgames
                </TopNavDropdownLink>
              </MenuItem>
              <MenuItem>
                <TopNavDropdownLink to={reverse("rooms_index")}>
                  Rooms
                </TopNavDropdownLink>
              </MenuItem>
              {context.is_staff && (
                <>
                  <MenuSeparator className="divider m-0" />
                  <MenuItem>
                    <TopNavDropdownLink to={reverse("admin")}>
                      Admin
                    </TopNavDropdownLink>
                  </MenuItem>
                </>
              )}
              <MenuSeparator className="divider m-0" />
              <MenuItem>
                <TopNavDropdownLink to={reverse("logout")}>
                  Log out
                </TopNavDropdownLink>
              </MenuItem>
            </MenuItems>
          </Menu>
        </li>
      ) : (
        <>
          <TopNavLink to={reverse("login")}>Log in</TopNavLink>
          <TopNavLink to={reverse("accounts_signup")}>Sign up</TopNavLink>
        </>
      )}
    </ul>
  );
};
