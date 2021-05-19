import debounce from '.';

jest.useFakeTimers();

describe('디바운스 함수가 작동되는지 검사한다.', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce({ cb: func, delay: 1000 });
  });

  test('함수가 한번만 작동되어야 한다.', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }
    jest.runAllTimers();
    expect(func).toBeCalledTimes(1);
  });
});
