const dateTimeFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
});

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});

export const getLocalDateTime = (date: Date) => {
  return dateTimeFormatter.format(date);
};

export const getLocalDate = (date: Date) => {
  return dateFormatter.format(date);
};

export const getLocalTime = (date: Date) => {
  return timeFormatter.format(date);
};
