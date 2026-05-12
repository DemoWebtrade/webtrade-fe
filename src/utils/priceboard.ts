import type { IRowNode } from "ag-grid-community";

export function flashCellWithColor(
  rowNode: IRowNode,
  colId: string,
  color: string, // màu hex
) {
  const cellEl = document.querySelector(
    `[row-id="${rowNode.id}"] [col-id="${colId}"]`,
  ) as HTMLElement | null;

  if (!cellEl) return;

  const originalBg = cellEl.style.backgroundColor;

  // Flash: đổi background
  cellEl.style.transition = "background-color 0s";
  cellEl.style.backgroundColor = color + "55";

  setTimeout(() => {
    cellEl.style.transition = "background-color 0.4s ease-out";
    cellEl.style.backgroundColor = originalBg;
  }, 300);
}

export function getFlashClass(
  comparePrice: number | undefined,
  ref: number,
  ceil: number,
  floor: number,
): string {
  if (comparePrice == null) return "";
  if (comparePrice === ceil) return "cell-flash-ceil";
  if (comparePrice === floor) return "cell-flash-floor";
  if (comparePrice > ref) return "cell-flash-up";
  if (comparePrice < ref) return "cell-flash-down";
  if (comparePrice === ref) return "cell-flash-ref";
  return "";
}
