interface DebounceProps {
  cb: () => void;
  delay: number;
}

const debounce = ({ cb, delay }: DebounceProps) => {
  let timer: number | null = null;
  return function () {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => cb(), delay);
  };
};

export default debounce;
