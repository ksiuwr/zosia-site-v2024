import React from "react";
import { CenteredContentContainer } from "../containers/CenteredContentContainer";

export const About = () => {
  return (
    <CenteredContentContainer>
      <div className="card card-compact my-8 bg-base-300 lg:card-normal lg:my-14">
        <div className="card-body text-base-content lg:text-lg">
          <p>
            <b>ZOSIA</b>{" "}
            {`("Zimowy Obóz Studentów Informatyki A", roughly
          translated as "The Best Computer Science Students' Winter Camp") is
          the annual gathering for people associated with the Institute of
          Computer Science at the University of Wroclaw. It started 20 years ago
          with a tight-knit group of friends and has grown to group of about 200
          people from all over the world. During the three-day conference
          attendees are welcome not only to enjoy talks (not only about computer
          science), but also various outdoor activities, trips, and of course
          integration with past and current students and lecturers.`}
          </p>
        </div>
      </div>
    </CenteredContentContainer>
  );
};
