import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const useClock = (type: "hour" | "minute" | "second") => {
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
