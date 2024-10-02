type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export const getCSSColor = (variable: string): HSLColor => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const color = computedStyle.getPropertyValue(variable).trim();
  const [h = "0", s = "0", l = "0"] = color.split(" ");

  const parseColorValue = (value: string): number => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  return {
    h: parseColorValue(h),
    s: parseColorValue(s),
    l: parseColorValue(l),
  };
};

export const adjustHSLOpacity = (color: HSLColor, opacity: number): string => {
  const { h, s, l } = color;
  return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
};
