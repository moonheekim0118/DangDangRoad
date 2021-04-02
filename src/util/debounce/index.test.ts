import debounce from '.';

jest.useFakeTimers();

describe('check debounce works', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce({ cb: func, delay: 1000 });
  });

  test('excute once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }
    jest.runAllTimers();
    expect(func).toBeCalledTimes(1);
  });
});
