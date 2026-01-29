export const getCssVar = (name: string) => {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(name).trim();
};
