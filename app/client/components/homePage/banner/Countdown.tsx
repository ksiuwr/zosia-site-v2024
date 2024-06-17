import React, { CSSProperties, useEffect, useState } from "react";

interface CountdownProps {
  endDate: Date;
  onCountdownFinish: () => void;
}

interface CountdownSpanCSS extends CSSProperties {
  "--value": number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endDate: Date): TimeLeft => {
  const currentDate = new Date();
  const milisDifference = +endDate - +currentDate;

  const timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (milisDifference > 0) {
    const seconds = Math.floor(milisDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    timeLeft.days = days;
    timeLeft.hours = hours % 24;
    timeLeft.minutes = minutes % 60;
    timeLeft.seconds = seconds % 60;
  }

  return timeLeft;
};

const isCountdownFinished = (timeLeft: TimeLeft) =>
  timeLeft.days === 0 &&
  timeLeft.hours === 0 &&
  timeLeft.minutes === 0 &&
  timeLeft.seconds === 0;

export const Countdown = ({ endDate, onCountdownFinish }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(endDate);

      if (isCountdownFinished(timeLeft)) {
        onCountdownFinish();
      }

      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearTimeout(timer);
  }, [endDate, onCountdownFinish]);

  return (
    <div className="flex justify-center gap-6 text-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": value } as CountdownSpanCSS}></span>
          </span>
          <span className="text-lg">{key}</span>
        </div>
      ))}
    </div>
  );
};
