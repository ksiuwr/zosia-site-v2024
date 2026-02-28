import { CenteredContentContainer } from "@client/components/containers/CenteredContentContainer";
import { Layout } from "@client/components/Layout";
import { PageTitle } from "@client/components/PageTitle";
import { ScheduleEntry } from "@client/components/schedule/ScheduleEntry";
import { validateScheduleJson } from "@client/utils/scheduleData";
import { templates } from "@reactivated";
import React from "react";

export const Template = (props: templates.Schedule) => {
  const parsedData = JSON.parse(props.schedule_json_data);
  const isDataValid = validateScheduleJson(parsedData);
  if (!isDataValid) {
    console.error(validateScheduleJson.errors);
  }

  return (
    <Layout>
      <PageTitle>Schedule</PageTitle>
      <CenteredContentContainer>
        {isDataValid &&
          parsedData.map((day) => (
            <div key={day.name} className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">{day.name}</h2>
              {day.events.map((event) => (
                <ScheduleEntry
                  key={event.title}
                  startTime={event.startTime}
                  duration={event.duration}
                  title={event.title}
                  lecturer={event.lecturer}
                  organization={
                    event.showOrganization && event.organization
                      ? event.organization
                      : undefined
                  }
                  abstract={event.abstract}
                  highlight={event.highlight === "gold" || event.highlight === "silver"}
                />
              ))}
            </div>
          ))}
      </CenteredContentContainer>
    </Layout>
  );
};
