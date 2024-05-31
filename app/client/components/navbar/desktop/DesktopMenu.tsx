import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import React, { useContext } from "react";
import { Divider } from "../Divider";
import { TopNavDropdownLink } from "./TopNavDropdownLink";
import { TopNavLink } from "./TopNavLink";
import { Context, reverse } from "@reactivated";

export const DesktopMenu = () => {
  const context = useContext(Context);

  return (
    <div className="hidden lg:flex">
      <TopNavLink to={reverse("blog_index")}>Blog</TopNavLink>
      <TopNavLink to={reverse("questions_index")}>Q&A</TopNavLink>
      <TopNavLink to={reverse("lectures_index")}>Lectures</TopNavLink>
      <TopNavLink to={reverse("lectures_schedule")}>Schedule</TopNavLink>
      {context.is_authenticated ? (
        <Menu>
          <MenuButton>
            {context.first_name} {context.last_name}
          </MenuButton>
          <MenuItems anchor="bottom start">
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
                <Divider />
                <MenuItem>
                  <TopNavDropdownLink to={reverse("admin")}>
                    Admin
                  </TopNavDropdownLink>
                </MenuItem>
              </>
            )}
            <Divider />
            <MenuItem>
              <TopNavDropdownLink to={reverse("logout")}>
                Log out
              </TopNavDropdownLink>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : (
        <>
          <TopNavLink to={reverse("login")}>Log in</TopNavLink>
          <TopNavLink to={reverse("accounts_signup")}>Sign up</TopNavLink>
        </>
      )}
    </div>
  );
};
