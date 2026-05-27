import React from "react";
import { CenteredContentContainer } from "../containers/CenteredContentContainer";

export const About = () => {
  return (
    <CenteredContentContainer>
      <div className="card card-compact my-8 bg-base-300 lg:card-normal lg:my-14">
        <div className="card-body text-base-content lg:text-lg">
          <p>
            <b>LEOSIA</b>{" "}
            {`("LEtni Obóz Studentów informatyki" - summer version of "Zimowy Obóz 
			Studentów Informatyki") is a 4-day conference created by and for people 
			associated with the Institute of Computer Science at the University of Wroclaw. 
			The event will host around 100 participants - students, PhD students, 
			lecturers and business professionals. During the conference there wil be
			lectures and workshops on various topics related (mostly but not only)
			to computer science, outdoor activities and social events. The camp
			allows for integration between students, lecturers and professionals.`}
          </p>
        </div>
      </div>
    </CenteredContentContainer>
  );
};
