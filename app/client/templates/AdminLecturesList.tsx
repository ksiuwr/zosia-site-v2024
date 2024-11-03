import { AdminCenteredContainer } from "@client/components/admin/layout/AdminCenteredContainer";
import { AdminLayout } from "@client/components/admin/layout/AdminLayout";
import { AdminLecturesAcceptedCheckbox } from "@client/components/admin/lectures/AdminLecturesAcceptedCheckbox";
import { AdminTable } from "@client/components/admin/tables/AdminTable";
import { AdminTableActions } from "@client/components/admin/tables/AdminTableActions";
import { AdminTableEditLink } from "@client/components/admin/tables/AdminTableEditLink";
import { AdminTablePopover } from "@client/components/admin/tables/AdminTablePopover";
import { PageTitle } from "@client/components/PageTitle";
import { reverse, templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.AdminLecturesList) => {
  return (
    <AdminLayout>
      <PageTitle>Lectures</PageTitle>
      <AdminCenteredContainer>
        <AdminTable
          headerNames={[
            "Type",
            "Duration (minutes)",
            "Main author",
            "Title",
            "Accepted?",
            "Actions",
          ]}
          addEntryLink={{
            href: reverse("lectures_staff_add"),
            label: "Add lecture",
          }}
        >
          {props.lectures.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.lecture_type}</td>
              <td>{lecture.duration}</td>
              <td>{`${lecture.author.first_name} ${lecture.author.last_name}`}</td>
              <td>
                {
                  <AdminTablePopover
                    buttonLabel={lecture.title}
                    panelContent={[
                      { header: "Abstract", description: lecture.abstract },
                      {
                        header: "Main author (with type)",
                        description: `${lecture.author.first_name} ${lecture.author.last_name} (${lecture.author.person_type})`,
                      },
                      {
                        header: "Supporting authors provided",
                        description: lecture.supporters_names,
                      },
                      {
                        header: "Author's description",
                        description: lecture.description || "",
                      },
                      {
                        header: "Requests or comments",
                        description: lecture.requests || "",
                      },
                      { header: "Events", description: lecture.events || "" },
                    ]}
                  />
                }
              </td>
              <td>
                <AdminLecturesAcceptedCheckbox
                  lectureId={lecture.id}
                  initialIsActive={lecture.accepted}
                />
              </td>
              <td>
                <AdminTableActions>
                  <AdminTableEditLink
                    href={reverse("lectures_edit", { lecture_id: lecture.id })}
                  />
                </AdminTableActions>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCenteredContainer>
    </AdminLayout>
  );
};
