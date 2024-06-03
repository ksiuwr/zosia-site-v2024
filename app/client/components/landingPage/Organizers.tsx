import React, { useContext } from "react";
import { Context } from "@reactivated";

export const Organizers = () => {
  const context = useContext(Context);

  const organizers = [
    {
      name: "University of Wrocław",
      logo: `${context.STATIC_URL}imgs/Logo_UWr.svg`,
      url: "http://uni.wroc.pl",
    },
    {
      name: "Koło Studentów Informatyki",
      logo: `${context.STATIC_URL}imgs/Logo_KSI.svg`,
      url: "http://ksi.ii.uni.wroc.pl/",
    },
  ];

  return (
    <div className="bg-base-200 text-base-content">
      <h2 className="pt-10 text-center text-xl font-bold lg:text-4xl">
        Organizers
      </h2>
      <div className="mx-auto flex w-fit flex-col gap-0 lg:flex-row lg:gap-10">
        {organizers.map((organizer) => (
          <a
            href={organizer.url}
            target="_blank"
            className="link hover:mix-blend-difference"
            key={organizer.name}
          >
            <img
              src={organizer.logo}
              alt={`${organizer.name} logo`}
              className="h-36 lg:h-52"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
