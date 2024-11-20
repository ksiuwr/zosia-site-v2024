import React from "react";

interface AdminTableCheckboxProps {
  isChecked: boolean;
  isPending: boolean;
  onToggle: () => void;
}

export const AdminTableCheckbox = ({
  isChecked,
  isPending,
  onToggle,
}: AdminTableCheckboxProps) => {
  if (isPending) {
    return <span className="loading loading-spinner size-5 lg:size-7"></span>;
  }

  return (
    <input
      type="checkbox"
      className={`checkbox mx-auto size-5 checked:checkbox-success lg:size-7`}
      checked={isChecked}
      onChange={onToggle}
    />
  );
};
