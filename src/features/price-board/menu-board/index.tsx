import { ShiftingDropDown } from "@/components/ui/ShiftingDropDown";
import { MENU_BOARD } from "@/configs";

export default function MenuBoard({
  id,
  setId,
}: {
  id: string;
  setId: (id: string) => void;
}) {
  const handleChangeId = (id: string) => {
    setId(id);
  };

  return (
    <div
      className="w-full h-full flex flex-wrap md:gap-2 gap-1 items-center"
      data-tour="prop-6"
    >
      {MENU_BOARD.map((t, index) => (
        <ShiftingDropDown
          key={index}
          t={t}
          id={id}
          handleChangeId={handleChangeId}
        />
      ))}
    </div>
  );
}
