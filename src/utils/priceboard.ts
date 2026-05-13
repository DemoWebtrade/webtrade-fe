import type { IRowNode } from "ag-grid-community";

export function flashCellWithColor(
  rowNode: IRowNode,
  colId: string,
  color: string,
) {
  const containerSelector = rowNode.rowPinned ? ".ag-floating-top" : ".ag-body";

  const cellEl = document.querySelector(
    `${containerSelector} [row-id="${rowNode.id}"] [col-id="${colId}"]`,
  ) as HTMLElement | null;

  if (!cellEl) return;

  if (!cellEl.dataset.originalColor) {
    cellEl.dataset.originalColor = cellEl.style.color;
  }
  const originalColor = cellEl.dataset.originalColor;

  cellEl.style.transition = "background-color 0s";
  cellEl.style.backgroundColor = color + "55";
  cellEl.style.color = "#fffff9";

  setTimeout(() => {
    cellEl.style.transition =
      "background-color 0.4s ease-out, color 0.1s ease-out";
    cellEl.style.backgroundColor = "transparent";
    cellEl.style.color = originalColor;
    delete cellEl.dataset.originalColor;
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

export function getFlashVolumePriceClass(val: number, preVal: number): string {
  if (val > preVal) return "cell-flash-up";
  if (val < preVal) return "cell-flash-down";
  return "";
}

export function getFlashVolumeClass(check: boolean): string {
  return check ? "cell-flash-volume" : "";
}
