export interface RefType<T> {
  value: T;
}

export const defaultRef = <T>(init: T) => {
  return {
    value: init,
  };
};

export interface InputRef {
  value: string;
  error?: boolean;
  focus?: () => void;
}

export const inputDefaultRef = (initValue?: string) => {
  return {
    value: initValue || '',
    error: false,
    focus: function () {},
  };
};
