import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Context, reverse } from "@reactivated";
import React, { useContext } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { TopNavDropdownLink } from "./TopNavDropdownLink";
import { TopNavLink } from "./TopNavLink";

export const DesktopMenu = () => {
  const context = useContext(Context);

  return (
    <ul className="hidden h-full items-center justify-end bg-base-300 lg:flex">
      <TopNavLink to={reverse("blog_index")}>Blog</TopNavLink>
      <TopNavLink to={reverse("questions_index")}>Q&A</TopNavLink>
      <TopNavLink to={reverse("lectures_index")}>Lectures</TopNavLink>
      <TopNavLink to={reverse("lectures_schedule")}>Schedule</TopNavLink>
      {context.user.is_authenticated ? (
        <li>
          <Menu>
            <MenuButton className="group btn btn-ghost">
              {context.user.first_name} {context.user.last_name}{" "}
              <ChevronDownIcon className="inline size-4 stroke-current group-data-[active]:rotate-180 [&>path]:stroke-[2]" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              as="ul"
              className="menu w-52 rounded-box bg-base-200"
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
              <MenuItem>
                <TopNavDropdownLink to={reverse("lectures_add")}>
                  Add Lecture
                </TopNavDropdownLink>
              </MenuItem>
              {context.user.is_staff && (
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
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};
