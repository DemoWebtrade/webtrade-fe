import type { CustomCellRendererProps } from "ag-grid-react";

export default function SymbolRow(props: CustomCellRendererProps) {
  const symbol = props.value as string;

  return (
    <div
      data-tooltip-id="global-tooltip"
      data-tooltip-content={`${symbol}`}
      data-tooltip-place="right"
    >
      {symbol}
    </div>
  );
}
