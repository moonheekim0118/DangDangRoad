export const checkFreeTextLength = (value: string): boolean => {
  return value.length <= 100 && value.length >= 10;
};

export const checkCommentLength = (value: string): boolean => {
  return value.length <= 50 && value.length > 0;
};
