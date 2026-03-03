import { useEffect, useRef } from "react";

import type { CustomCellRendererProps } from "ag-grid-react";
import { Pin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PinRow(props: CustomCellRendererProps) {
  const { t } = useTranslation();

  const pinRef = useRef(null);

  useEffect(() => {
    props.registerRowDragger(pinRef.current!);
  });

  return (
    <div
      ref={pinRef}
      className="flex items-center justify-center w-full h-full"
      data-tooltip-id="global-tooltip"
      data-tooltip-content={t("pin-detail")}
      data-tooltip-place="right"
    >
      <Pin className="size-3 md:size-4" />
    </div>
  );
}
