import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Time() {
  return (
    <div className="flex w-max items-center justify-center text-content-primary text-sm font-semibold">
      <ClockItem type="hour" /> :
      <ClockItem type="minute" /> :
      <ClockItem type="second" />
    </div>
  );
}

const ClockItem = ({ type }: { type: "hour" | "minute" | "second" }) => {
  const { ref, time } = useClock(type);

  return (
    <div className="w-6 text-center overflow-hidden">
      <span ref={ref} className="block">
        {time.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

const useClock = (type: "hour" | "minute" | "second") => {
  const [ref, animate] = useAnimate();
  const timeRef = useRef<number>(0);
  const getTimeValue = () => {
    const now = new Date();

    if (type === "hour") return now.getHours();
    if (type === "minute") return now.getMinutes();
    return now.getSeconds();
  };
  const [time, setTime] = useState<number>(getTimeValue());

  const tick = async () => {
    const newTime = getTimeValue();

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.25 },
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.25 },
      );
    }
  };

  useEffect(() => {
    const init = getTimeValue();
    timeRef.current = init;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return { ref, time };
};
