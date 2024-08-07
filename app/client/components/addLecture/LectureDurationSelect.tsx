import { zosiaApi, zosiaApiRoutes } from "@client/utils/zosiaApi";
import { Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { WidgetHandler } from "reactivated/dist/forms";
import { DjangoFormsWidgetsSelect } from "reactivated/dist/generated";

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
        return Promise.resolve({
          durations: ["Please choose lecture type first!"],
        });
      }

      const res = await zosiaApi.get(zosiaApiRoutes.addLectureDurations, {
        params: { lecture_type: lecture },
      });
      return res.data;
    },
    initialData: { durations: ["Please choose lecture type first!"] },
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

  const durations = data as LectureDurations;

  return (
    <Select
      name={field.name}
      className="select select-bordered w-full"
      required={field.widget.required}
      value={field.value ?? ""}
      onChange={(e) => field.handler(e.target.value)}
    >
      {durations.durations.map((duration) => (
        <option key={duration} value={duration}>
          {duration}
        </option>
      ))}
    </Select>
  );
};
