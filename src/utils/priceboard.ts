import type { IRowNode } from "ag-grid-community";

const cellCache = new Map<string, WeakRef<HTMLElement>>();
const timeoutMap = new Map<string, ReturnType<typeof setTimeout>>();

export function flashCellWithColor(
  rowNode: IRowNode,
  colId: string,
  flash: string,
  color: string,
) {
  const cacheKey = `${rowNode.id}__${colId}`;

  let cellEl = cellCache.get(cacheKey)?.deref();

  if (!cellEl || !document.contains(cellEl)) {
    const containerSelector = rowNode.rowPinned
      ? ".ag-floating-top"
      : ".ag-body";
    cellEl = document.querySelector(
      `${containerSelector} [row-id="${rowNode.id}"] [col-id="${colId}"]`,
    ) as HTMLElement;

    if (!cellEl) return;
    cellCache.set(cacheKey, new WeakRef(cellEl));
  }

  // Clear timeout cũ nếu flash chưa kết thúc
  const existingTimeout = timeoutMap.get(cacheKey);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
    cellEl.style.transition = "";
  }

  cellEl.style.transition = "background-color 0s";
  cellEl.style.backgroundColor = flash;
  cellEl.style.color = colId === "symbol" ? color : "#fffff8";

  const timeout = setTimeout(() => {
    if (!cellEl) return;
    cellEl.style.transition =
      "background-color 0.4s ease-out, color 0.1s ease-out";
    cellEl.style.backgroundColor = "transparent";
    cellEl.style.color = color;
    timeoutMap.delete(cacheKey);
  }, 300);

  timeoutMap.set(cacheKey, timeout);
}

// Gọi khi grid destroy hoặc row bị remove khỏi DOM
export function clearFlashCache(rowId?: string) {
  if (rowId) {
    for (const key of cellCache.keys()) {
      if (key.startsWith(`${rowId}__`)) {
        cellCache.delete(key);
        const t = timeoutMap.get(key);
        if (t) {
          clearTimeout(t);
          timeoutMap.delete(key);
        }
      }
    }
  } else {
    cellCache.clear();
    timeoutMap.forEach(clearTimeout);
    timeoutMap.clear();
  }
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
