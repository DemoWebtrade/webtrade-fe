export const Toggle = ({ on }: { on: boolean }) => (
  <div
    className={`w-9 h-5 rounded-full relative transition-colors duration-200 shrink-0
      ${on ? "bg-purple-active" : "bg-border"}`}
  >
    <div
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200
        ${on ? "translate-x-4" : "translate-x-0.5"}`}
    />
  </div>
);
