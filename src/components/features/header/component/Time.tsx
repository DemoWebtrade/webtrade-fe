import { useClock } from "@/hooks/useClock";

export default function Time() {
  return (
    <>
      <div className="flex flex-row w-max items-center justify-center text-content-primary">
        <ClockItem type="hour" />
        {": "}
        <ClockItem type="minute" /> {": "}
        <ClockItem type="second" />
      </div>
    </>
  );
}

const ClockItem = ({ type }: { type: "hour" | "minute" | "second" }) => {
  const { ref, time } = useClock(type);

  return (
    <div className="text-center overflow-hidden">
      <span ref={ref} className="block text-base font-medium leading-3">
        {time.toString().padStart(2, "0")}
      </span>
    </div>
  );
};
