import { useSite } from "@client/utils/site";
import React from "react";
import { CenteredContentContainer } from "../containers/CenteredContentContainer";

const descriptions: Record<string, string> = {
  zosia: `("Zimowy Obóz Studentów Informatyki A", roughly
          translated as "The Best Computer Science Students' Winter Camp") is
          the annual gathering for people associated with the Institute of
          Computer Science at the University of Wroclaw. It started 20 years ago
          with a tight-knit group of friends and has grown to group of about 200
          people from all over the world. During the three-day conference
          attendees are welcome not only to enjoy talks (not only about computer
          science), but also various outdoor activities, trips, and of course
          integration with past and current students and lecturers.`,
  leosia: `("LEtni Obóz Studentów informatyki" - summer version of "Zimowy Obóz
          Studentów Informatyki") is a 4-day conference created by and for people
          associated with the Institute of Computer Science at the University of Wroclaw.
          The event will host around 100 participants - students, PhD students,
          lecturers and business professionals. During the conference there wil be
          lectures and workshops on various topics related (mostly but not only)
          to computer science, outdoor activities and social events. The camp
          allows for integration between students, lecturers and professionals.`,
};

export const About = () => {
  const site = useSite();

  return (
    <CenteredContentContainer>
      <div className="card card-compact my-8 bg-base-300 lg:card-normal lg:my-14">
        <div className="card-body text-base-content lg:text-lg">
          <p>
            <b>{site.name}</b> {descriptions[site.code]}
          </p>
        </div>
      </div>
    </CenteredContentContainer>
  );
};
