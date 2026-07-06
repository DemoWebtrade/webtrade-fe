import { OverflowMenu } from "@/components/ui/OverflowMenu";
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
    <div className="w-full h-full min-w-0" data-tour="prop-6">
      <OverflowMenu
        items={MENU_BOARD}
        activeId={id}
        handleChangeId={handleChangeId}
      />
    </div>
  );
}
