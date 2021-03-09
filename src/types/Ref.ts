export interface RefType<T> {
  value: T;
}

export const defaultRef = <T>(init: T) => {
  return {
    value: init,
  };
};
