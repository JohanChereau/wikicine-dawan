export const capitalize = (sentence) => {
  return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
};
