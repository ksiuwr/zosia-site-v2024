import React from "react";
import { CenteredContentContainer } from "../containers/CenteredContentContainer";

export const About = () => {
  return (
    <CenteredContentContainer>
      <div className="card card-compact my-8 bg-base-300 lg:card-normal lg:my-14">
        <div className="card-body text-base-content lg:text-lg">
          <p>
            <b>LEOSIA</b>{" "}
            {`(“Letni Obóz Studentów Informatyki A”; “Computer Science Students’ Summer Camp”)
             is an event inspired by the long-standing winter conference ZOSIA, which has been
              traditionally held for the past 20 years at our institute. For now a smaller and
               more informal version of a scientific conference, LEOSIA will take place for the
              first time this summer. During the 3-day conference, participants will not only
              enjoy talks and lectures, but also outdoor activities, trips, and the opportunity
              to socialize with both current and former students and lecturers.`}
          </p>
        </div>
      </div>
    </CenteredContentContainer>
  );
};
