import React, { CSSProperties, useEffect } from "react";

interface CountdownProps {
  endDate: Date;
  onCountdownFinish: () => void;
}

interface CountdownSpanCSS extends CSSProperties {
  "--value": number;
}

export const Countdown = ({ endDate, onCountdownFinish }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const currentDate = new Date();
    const milisDifference = +endDate - +currentDate;

    let timeLeft = {
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
    } else {
      onCountdownFinish();
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

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
