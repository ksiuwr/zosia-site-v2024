import Ajv, { JTDDataType } from "ajv/dist/jtd";
const ajv = new Ajv();

export const scheduleDataSchema = {
  elements: {
    properties: {
      name: { type: "string" },
      events: {
        elements: {
          properties: {
            title: { type: "string" },
            type: { enum: ["meal", "event", "lecture", "workshop"] },
            startTime: { type: "string" },
            endTime: { type: "string" },
            duration: { type: "string" },
          },
          optionalProperties: {
            abstract: { elements: { type: "string" } },
            lecturer: { type: "string" },
            showOrganization: { type: "boolean" },
            highlight: { enum: ["none", "bronze", "silver", "gold"] },
            organization: { type: "string", nullable: true },
          },
          additionalProperties: true,
        },
      },
    },
    additionalProperties: true,
  },
} as const;

type ScheduleData = JTDDataType<typeof scheduleDataSchema>;

export const validateScheduleJson =
  ajv.compile<ScheduleData>(scheduleDataSchema);

export const scheduleDataExample: ScheduleData = [
  {
    name: "Friday",
    events: [
      {
        title: "Opening ceremony",
        type: "event",
        startTime: "10:00",
        endTime: "11:00",
        duration: "60 min",
      },
      {
        title: "How to write a good JSON schema",
        type: "lecture",
        startTime: "14:00",
        endTime: "15:30",
        duration: "90 min",
        abstract: ["A lecture about JSON schema"],
        lecturer: "John Doe",
        showOrganization: true,
        organization: "Example Organization",
        highlight: "gold",
      },
    ],
  },
  {
    name: "Saturday",
    events: [
      {
        title: "Lunch",
        type: "meal",
        startTime: "12:00",
        endTime: "13:00",
        duration: "60 min",
      },
      {
        title: "Workshop: How to write a good JSON schema",
        type: "workshop",
        startTime: "15:00",
        endTime: "15:30",
        duration: "30 min",
      },
    ],
  },
];
