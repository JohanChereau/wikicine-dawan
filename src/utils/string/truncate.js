export const truncateText = (text, length, endChar) => {
  if (length < endChar.length)
    throw new Error(
      'Length must be greater than or equal to the length of the end character(s).'
    );

  if (text.length <= length) return text;

  return text.slice(0, length - endChar.length) + endChar;
};
