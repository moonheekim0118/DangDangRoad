export const freeTextLengthCheck = (value: string): boolean => {
  return value.length <= 100 && value.length >= 10;
};
