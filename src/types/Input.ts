export interface inputRef {
  value: string;
  error?: boolean;
  focus: () => void;
}

export const defaultRef = {
  value: '',
  error: false,
  focus: function () {},
};
