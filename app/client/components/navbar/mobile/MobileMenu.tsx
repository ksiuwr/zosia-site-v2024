import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ClockIcon,
  DocumentPlusIcon,
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

const ICON_CSS = "size-6";

export const MobileMenu = () => {
  const context = useContext(Context);

  return (
    <Popover className="absolute left-0 lg:hidden">
      <PopoverButton className="btn btn-circle btn-ghost">
        <Bars3Icon className="size-6" />
      </PopoverButton>

      <PopoverBackdrop className="fixed inset-0 z-40 bg-black/50" />
      <Transition
        enter="transition ease-in-out duration-200"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <PopoverPanel className="fixed left-0 top-0 z-50 h-full overflow-scroll bg-base-100">
          {context.user.is_authenticated ? (
            <>
              <SideNavLink to={reverse("accounts_profile")}>
                <UserCircleIcon className={ICON_CSS} />
                {context.user.first_name} {context.user.last_name}
              </SideNavLink>
              <SideNavLink to={reverse("logout")}>
                <ArrowRightStartOnRectangleIcon className={ICON_CSS} />
                Log out
              </SideNavLink>
            </>
          ) : (
            <>
              <SideNavLink to={reverse("login")}>
                <ArrowRightEndOnRectangleIcon className={ICON_CSS} />
                Log in
              </SideNavLink>
              <SideNavLink to={reverse("accounts_signup")}>
                <UserPlusIcon className={ICON_CSS} />
                Sign up
              </SideNavLink>
            </>
          )}
          <Divider />
          {context.user.is_staff && (
            <>
              <SideNavLink to={reverse("admin")}>
                <LockClosedIcon className={ICON_CSS} />
                Admin
              </SideNavLink>
              <Divider />
            </>
          )}
          {context.user.is_authenticated && (
            <>
              <SideNavLink to={reverse("rooms_index")}>
                <HomeModernIcon className={ICON_CSS} />
                Rooms
              </SideNavLink>
              <SideNavLink to={reverse("boardgames_index")}>
                <PuzzlePieceIcon className={ICON_CSS} />
                Boardgames
              </SideNavLink>
              <SideNavLink to={reverse("lectures_add")}>
                <DocumentPlusIcon className={ICON_CSS} />
                Add Lecture
              </SideNavLink>
              <Divider />
            </>
          )}
          <SideNavLink to={reverse("blog_index")}>
            <InformationCircleIcon className={ICON_CSS} />
            Blog
          </SideNavLink>
          <SideNavLink to={reverse("questions_index")}>
            <QuestionMarkCircleIcon className={ICON_CSS} />
            Q&A
          </SideNavLink>
          <SideNavLink to={reverse("lectures_index")}>
            <BookOpenIcon className={ICON_CSS} />
            Lectures
          </SideNavLink>
          <SideNavLink to={reverse("lectures_schedule")}>
            <ClockIcon className={ICON_CSS} />
            Schedule
          </SideNavLink>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
