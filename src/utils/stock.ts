export function getColorClass(
  comparePrice: number | undefined,
  ref: number = 0,
  ceil: number = 0,
  floor: number = 0,
): string {
  if (comparePrice == null) return "";
  if (comparePrice === ceil) return "text-purple-base";
  if (comparePrice === floor) return "text-blue-base";
  if (comparePrice > ref) return "text-green-base";
  if (comparePrice < ref) return "text-red-base";
  if (comparePrice === ref) return "text-yellow-base";
  return "";
}
