export const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const parseFrom = (input: string) => {
  const regex = /^(.*?)\s*<(.+)>$/;
  const match = regex.exec(input);

  if (match) {
    return {
      name: capitalizeWords(match[1]?.trim() ?? ""),
      email: match[2]?.trim(),
    };
  } else {
    return null; // or throw new Error("Invalid format");
  }
};

export const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
