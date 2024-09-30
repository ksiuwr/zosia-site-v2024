import React from "react";

export interface ProfilePreferencesAccomodationProps {
  accomodation: Array<[string, boolean]>;
}

export const ProfilePreferencesAccomodation = ({
  accomodation,
}: ProfilePreferencesAccomodationProps) => {
  return (
    <div>
      {accomodation.map(([accomodationName, checked]) => (
        <div
          key={accomodationName}
          className="mb-3 flex flex-row items-center gap-x-2"
        >
          <input
            type="checkbox"
            className="checkbox size-6 cursor-default checked:checkbox-success"
            checked={checked}
            readOnly
          ></input>
          <span>{accomodationName}</span>
        </div>
      ))}
    </div>
  );
};
