export interface ImageRef {
  value: string[];
}

export const defaultRef = (init?: string[]) => {
  return {
    value: init || [],
  };
};
