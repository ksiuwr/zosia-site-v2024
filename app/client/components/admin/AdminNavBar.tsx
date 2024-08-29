import { reverse } from "@reactivated";
import clsx from "clsx";
import React from "react";

interface AdminNavBarProps {
  showAsSidebar?: boolean;
}

interface AdminNavBarSection {
  sectionTitle: string;
  links: { linkTitle: string; href: string }[];
}

const navbarSections: AdminNavBarSection[] = [
  {
    sectionTitle: "Users",
    links: [
      { linkTitle: "Preferences", href: reverse("user_preferences_index") },
      { linkTitle: "Email users", href: reverse("mail_all") },
    ],
  },
  {
    sectionTitle: "Organizers",
    links: [
      {
        linkTitle: "List and edit organizers",
        href: reverse("organizers_index"),
      },
      { linkTitle: "Add organizers", href: reverse("organizers_add") },
    ],
  },
  {
    sectionTitle: "Blog",
    links: [
      { linkTitle: "List blog posts", href: reverse("blog_list") },
      { linkTitle: "Add blog post", href: reverse("blog_create") },
    ],
  },
  {
    sectionTitle: "Sponsors",
    links: [
      { linkTitle: "List sponsors", href: reverse("sponsors_index") },
      { linkTitle: "Add sponsor", href: reverse("sponsors_add") },
    ],
  },
  {
    sectionTitle: "Q&A",
    links: [
      {
        linkTitle: "List questions and answers",
        href: reverse("questions_index_staff"),
      },
      { linkTitle: "Add question and answer", href: reverse("questions_add") },
    ],
  },
  {
    sectionTitle: "Lectures",
    links: [
      { linkTitle: "List lectures", href: reverse("lectures_all_staff") },
      { linkTitle: "Add lecture", href: reverse("lectures_staff_add") },
      { linkTitle: "Update schedule", href: reverse("lectures_schedule_add") },
    ],
  },
  {
    sectionTitle: "Rooms",
    links: [{ linkTitle: "Upload rooms", href: reverse("rooms_import") }],
  },
  {
    sectionTitle: "Boardgames",
    links: [
      { linkTitle: "Accept boardgames", href: reverse("boardgames_accept") },
    ],
  },
  {
    sectionTitle: "Event info",
    links: [
      { linkTitle: "Conferences", href: reverse("conferences") },
      {
        linkTitle: "Places",
        href: reverse("place"),
      },
      {
        linkTitle: "Transport",
        href: reverse("transport"),
      },
      { linkTitle: "Organizations", href: reverse("organizations") },
      { linkTitle: "Statistics", href: reverse("statistics") },
    ],
  },
  {
    sectionTitle: "Downloads",
    links: [
      {
        linkTitle: "ZOSIA data export (for zosia-print script) (JSON)",
        href: reverse("export_data"),
      },
      {
        linkTitle: "Lectures export (for spreadsheet-scheduler) (CSV)",
        href: reverse("list_csv_lectures"),
      },
      { linkTitle: "Shirts export (CSV)", href: reverse("export_shirts") },
      {
        linkTitle: "Preferences of registered users (CSV)",
        href: reverse("list_csv_preferences_all"),
      },
      {
        linkTitle: "Preferences of paid users (CSV)",
        href: reverse("list_csv_preferences_paid"),
      },
      {
        linkTitle: "User --> Room (CSV)",
        href: reverse("list_csv_room_by_user"),
      },
      {
        linkTitle: "Room member --> Room (CSV)",
        href: reverse("list_csv_room_by_member"),
      },
      {
        linkTitle: "Room --> Members (CSV)",
        href: reverse("list_csv_members_by_room"),
      },
      {
        linkTitle: "User --> Transport (CSV)",
        href: reverse("list_csv_transport_by_user"),
      },
      {
        linkTitle: "Transport --> Registered users (CSV)",
        href: reverse("list_csv_all_users_by_transport"),
      },
      {
        linkTitle: "Transport --> Paid users (CSV)",
        href: reverse("list_csv_paid_users_by_transport"),
      },
      {
        linkTitle: "Transport --> Paid student users (CSV)",
        href: reverse("list_csv_paid_students_by_transport"),
      },
      {
        linkTitle: "Transport --> Paid non-student users (CSV)",
        href: reverse("list_csv_paid_non_students_by_transport"),
      },
    ],
  },
];

export const AdminNavBar = ({ showAsSidebar }: AdminNavBarProps) => {
  return (
    <div
      className={clsx(
        showAsSidebar && "hidden h-full overflow-scroll bg-base-300 lg:block",
        !showAsSidebar &&
          "w-full rounded-box border border-base-content bg-base-100",
      )}
    >
      {showAsSidebar && (
        <h1 className="pt-4 text-center text-xl font-bold">Admin Panel</h1>
      )}

      <ul
        className={clsx(
          "menu w-full rounded-box",
          showAsSidebar && "lg:menu-md",
          !showAsSidebar && "lg:menu-lg",
        )}
      >
        {navbarSections.map(({ sectionTitle, links }) => (
          <li key={sectionTitle}>
            <h2
              className={clsx(
                "menu-title text-base-content",
                showAsSidebar && "lg:text-md",
                !showAsSidebar && "lg:text-xl",
              )}
            >
              {sectionTitle}
            </h2>
            <ul>
              {links.map(({ linkTitle, href }) => (
                <li key={href}>
                  <a href={href}>{linkTitle}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
