import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ClockIcon,
  HomeModernIcon,
  InformationCircleIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Context, reverse } from "@reactivated";
import React, { useContext } from "react";
import { Divider } from "./Divider";
import { SideNavLink } from "./SideNavLink";

const ICON_SIZE = 6;

export const MobileMenu = () => {
  const context = useContext(Context);

  return (
    <Popover className="absolute left-0 lg:hidden">
      <PopoverButton className="btn btn-circle btn-ghost">
        <Bars3Icon className="size-6" />
      </PopoverButton>

      <PopoverOverlay className="fixed inset-0 z-40 bg-black/50" />
      <Transition
        enter="transition ease-in-out duration-200"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <PopoverPanel className="fixed left-0 top-0 z-50 h-full overflow-scroll bg-base-100">
          {context.is_authenticated ? (
            <>
              <SideNavLink to={reverse("accounts_profile")}>
                <UserCircleIcon className={`size-${ICON_SIZE}`} />
                {context.first_name} {context.last_name}
              </SideNavLink>
              <SideNavLink to={reverse("logout")}>
                <ArrowRightStartOnRectangleIcon
                  className={`size-${ICON_SIZE}`}
                />
                Log out
              </SideNavLink>
            </>
          ) : (
            <>
              <SideNavLink to={reverse("login")}>
                <ArrowRightEndOnRectangleIcon className={`size-${ICON_SIZE}`} />
                Log in
              </SideNavLink>
              <SideNavLink to={reverse("accounts_signup")}>
                <UserPlusIcon className={`size-${ICON_SIZE}`} />
                Sign up
              </SideNavLink>
            </>
          )}
          <Divider />
          {context.is_staff && (
            <>
              <SideNavLink to={reverse("admin")}>
                <LockClosedIcon className={`size-${ICON_SIZE}`} />
                Admin
              </SideNavLink>
              <Divider />
            </>
          )}
          {context.is_authenticated && (
            <>
              <SideNavLink to={reverse("rooms_index")}>
                <HomeModernIcon className={`size-${ICON_SIZE}`} />
                Rooms
              </SideNavLink>
              <SideNavLink to={reverse("boardgames_index")}>
                <PuzzlePieceIcon className={`size-${ICON_SIZE}`} />
                Boardgames
              </SideNavLink>
              <Divider />
            </>
          )}
          <SideNavLink to={reverse("blog_index")}>
            <InformationCircleIcon className={`size-${ICON_SIZE}`} />
            Blog
          </SideNavLink>
          <SideNavLink to={reverse("questions_index")}>
            <QuestionMarkCircleIcon className={`size-${ICON_SIZE}`} />
            Q&A
          </SideNavLink>
          <SideNavLink to={reverse("lectures_index")}>
            <BookOpenIcon className={`size-${ICON_SIZE}`} />
            Lectures
          </SideNavLink>
          <SideNavLink to={reverse("lectures_schedule")}>
            <ClockIcon className={`size-${ICON_SIZE}`} />
            Schedule
          </SideNavLink>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
