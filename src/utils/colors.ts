export const getCSSColor = (variable: string) => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const color = computedStyle.getPropertyValue(variable).trim();
  const [h, s, l] = color.split(" ");
  return `hsl(${h}, ${s}, ${l})`;
};
