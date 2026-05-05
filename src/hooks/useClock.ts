import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const useClock = (type: "hour" | "minute" | "second") => {
  const [ref, animate] = useAnimate();
  const timeRef = useRef<number>(0);

  const getTimeValue = (
    type: "hour" | "minute" | "second" = "hour",
  ): number => {
    // Tạo đối tượng Date theo múi giờ Việt Nam
    const nowVN = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    );

    if (type === "hour") return nowVN.getHours();
    if (type === "minute") return nowVN.getMinutes();
    return nowVN.getSeconds();
  };

  const [time, setTime] = useState<number>(getTimeValue(type));

  const tick = async () => {
    const newTime = getTimeValue(type);

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
    const init = getTimeValue(type);
    timeRef.current = init;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return { ref, time };
};
