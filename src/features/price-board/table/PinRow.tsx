import type { CustomCellRendererProps } from "ag-grid-react";
import { Pin } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function PinRow(props: CustomCellRendererProps) {
  const { t } = useTranslation();
  const pinRef = useRef<HTMLDivElement>(null);

  const isPinned = props.node.rowPinned === "top";

  // Đăng ký row dragger (cho drag để sắp xếp pinned rows nếu cần)
  useEffect(() => {
    if (pinRef.current) {
      props.registerRowDragger(pinRef.current);
    }
  }, [props]);

  return (
    <div
      ref={pinRef}
      className="flex items-center justify-center w-full h-full cursor-pointer"
      data-tooltip-id="global-tooltip"
      data-tooltip-content={t(isPinned ? "unpin-detail" : "pin-detail")}
      data-tooltip-place="right"
    >
      <Pin
        className={`size-3 transition-colors ${
          isPinned ? "text-purple-600" : ""
        }`}
      />
    </div>
  );
}
