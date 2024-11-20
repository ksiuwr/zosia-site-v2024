import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsSelect } from "reactivated/dist/generated";
import { BasicListbox } from "../forms/widgets/BasicListbox";

interface LectureDurationSelectProps {
  field: WidgetHandler<DjangoFormsWidgetsSelect>;
  lectureType: string;
}

interface LectureDurations {
  durations: string[];
}

export const LectureDurationSelect = ({
  field,
  lectureType,
}: LectureDurationSelectProps) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [zosiaApiRoutes.addLectureDurations, lectureType],
    queryFn: async ({ queryKey }) => {
      const lecture = queryKey[1];
      if (lecture === "") {
        return Promise.resolve<LectureDurations>({
          durations: ["Please choose lecture type first!"],
        });
      }

      const res = await zosiaApi.get(zosiaApiRoutes.addLectureDurations, {
        params: { lecture_type: lecture },
      });

      return {
        durations: res.data.durations.map(String) as string[],
      };
    },
  });

  if (isPending)
    return (
      <Select className="select select-bordered skeleton w-full" disabled>
        <option>Loading...</option>
      </Select>
    );

  if (isError)
    return (
      <Select className="select select-bordered w-full" disabled>
        <option>Error: {error.message}</option>
      </Select>
    );

  if (field.value && !data.durations.includes(field.value)) {
    // If the currently selected duration is not one of available durations, reset it to ""
    field.handler("");
  }

  return (
    <BasicListbox
      name={field.name}
      value={field.value ?? ""}
      onChange={field.handler}
      optgroups={data.durations.map((duration) => ({
        value: duration,
        label: duration,
      }))}
      multiple={false}
    />
  );
};
