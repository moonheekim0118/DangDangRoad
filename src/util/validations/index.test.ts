import {
  lengthValidator,
  emailValidator,
  emptySpaceValidator,
  emptyFixValidator,
  specialCharsValidator,
  loginValidator,
  nicknameValidator,
  nicknameValidatorForUpdate,
  passwordValidator,
  passwordCheckValidator,
  conditionValidator,
} from '.';

describe('주어진 최소길이와 최대길이에 대한 문자열 길이를 검사한다.', () => {
  test('문자열의 길이가 최대길이보다 큰 경우', () => {
    expect(
      lengthValidator(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing',
        50,
        10
      )
    ).toBe(false);
  });
  test('문자열의 길이가 최소길이보다 작은 경우', () => {
    expect(lengthValidator('Lorem ips', 50, 10)).toBe(false);
  });
  test('문자열의 길이가 최소길이보다 크고, 최대 길이보다 작은 경우', () => {
    expect(
      lengthValidator('Lorem ipsum dolor sit amet, consectetuer', 50, 10)
    ).toBe(true);
  });
});

describe('주어진 문자열이 이메일 형식인지 검사한다.', () => {
  test('주어진 문자열이 이메일 형식이 아닌 경우', () => {
    expect(emailValidator('thisisNotEmail')).toBe(false);
  });
  test('주어진 문자열이 이메일 형식인 경우', () => {
    expect(emailValidator('this@email.com')).toBe(true);
  });
});

describe('주어진 문자열에 공백이 포함되었는지 검사한다.', () => {
  test('문자열 가운데에 공백이 포함된 경우', () => {
    expect(emptySpaceValidator('there is Empty')).toBe(false);
  });
  test('문자열 맨 앞에 공백이 포함된 경우', () => {
    expect(emptySpaceValidator(' thereisEmpty')).toBe(false);
  });
  test('문자열 맨 뒤에 공백이 포함된 경우', () => {
    expect(emptySpaceValidator('thereisEmpty ')).toBe(false);
  });
  test('문자열에 공백이 포함되지 않은 경우', () => {
    expect(emptySpaceValidator('noEmptySpace')).toBe(true);
  });
});

describe('주어진 문자열의 앞, 뒤에 공백이 포함되었는지 검사한다.', () => {
  test('문자열의 맨 앞과 중간에 공백이 포함된 경우', () => {
    expect(emptyFixValidator(' Lorem ips')).toBe(false);
  });
  test('문자열의 맨 뒤와 중간에 공백이 포함된 경우', () => {
    expect(emptyFixValidator('Lorem ips ')).toBe(false);
  });
  test('문자열의 맨 앞과 맨 뒤에 공백이 포함된 경우', () => {
    expect(emptyFixValidator(' Loremips ')).toBe(false);
  });
  test('문자열에 공백이 포함되지 않은 경우', () => {
    expect(emptyFixValidator('Loremips')).toBe(true);
  });
  test('문자열의 중간에 공백이 포함된 경우', () => {
    expect(emptyFixValidator('Lore mips')).toBe(true);
  });
});

describe('문자열에 특수문자가 포함되었는지 검사한다.', () => {
  test('문자열에 특수문자가 포함된 경우', () => {
    expect(specialCharsValidator('Lorem!ipsum dolor sit amet')).toBe(false);
  });

  test('문자열에 특수문자가 포함되지 않은 경우', () => {
    expect(specialCharsValidator('Lorem ipsum dolor sit amet')).toBe(true);
  });
});

describe('주어진 문자열이 닉네임 조건을 충족하는지 검사한다.', () => {
  test('닉네임의 길이가 20 초과 인 경우', () => {
    expect(nicknameValidator('Lorem ipsum dolor sit amet')).toBe(false);
  });
  test('닉네임의 길이가 1 미만 인 경우', () => {
    expect(nicknameValidator('')).toBe(false);
  });
  test('닉네임에 특수문자가 포함된 경우', () => {
    expect(nicknameValidator('!!Lorem')).toBe(false);
  });
  test('닉네임의 앞에 공백이 포함된 경우', () => {
    expect(nicknameValidator(' Lorem')).toBe(false);
  });
  test('닉네임이 모든 조건을 충족한 경우', () => {
    expect(nicknameValidator('Lorem')).toBe(true);
  });
});

describe('주어진 문자열이 닉네임 수정 조건을 충족하는지 검사한다.', () => {
  test('닉네임의 길이가 20 초과 인 경우', () => {
    expect(nicknameValidatorForUpdate('Lorem ipsum dolor sit amet')).toBe(
      false
    );
  });
  test('닉네임에 특수문자가 포함된 경우', () => {
    expect(nicknameValidatorForUpdate('!!Lorem')).toBe(false);
  });
  test('닉네임의 앞에 공백이 포함된 경우', () => {
    expect(nicknameValidatorForUpdate(' Lorem')).toBe(false);
  });
  test('닉네임을 공백으로 제출한 경우', () => {
    expect(nicknameValidatorForUpdate('')).toBe(true);
  });
  test('닉네임이 모든 조건을 충족한 경우', () => {
    expect(nicknameValidatorForUpdate('Lorem')).toBe(true);
  });
});

describe('주어진 문자열이 비밀번호 조건을 충족하는지 검사한다.', () => {
  test('비밀번호의 길이가 6 미만인 경우', () => {
    expect(passwordValidator('Lorem')).toBe(false);
  });
  test('비밀번호의 길이가 16 초과인 경우', () => {
    expect(passwordValidator('LoremipsumdolorLoremipsumdolor')).toBe(false);
  });
  test('비밀번호에 공백이 포함된 경우', () => {
    expect(passwordValidator('Lorem ipsum')).toBe(false);
  });
  test('비밀번호가 모든 조건을 충족한 경우', () => {
    expect(passwordValidator('Loremipsum!')).toBe(true);
  });
});

describe('주어진 두개의 문자열이 일치하는지 검사한다.', () => {
  test('두 문자열의 소문자-대문자 차이만 있는 경우', () => {
    expect(passwordCheckValidator('Lorem')('lorem')).toBe(false);
  });
  test('두 문자열이 일치하지 않는 경우', () => {
    expect(passwordCheckValidator('Lorem')('rorem')).toBe(false);
  });
  test('두 문자열이 일치하는 경우', () => {
    expect(passwordCheckValidator('Lorem')('Lorem')).toBe(true);
  });
});

describe('주어진 이메일을 검증하고, 비밀번호가 입력되었는지 검사한다.', () => {
  test('이메일과 비밀번호 모두 입력되지 않은 경우', () => {
    expect(loginValidator('', '')).toBe(false);
  });
  test('이메일의 형식이 올바르지 않은 경우', () => {
    expect(loginValidator('email', 'password')).toBe(false);
  });
});

describe('주어진 조건을 충족하는지 검사한다.', () => {
  let mockFocus;
  beforeEach(() => {
    mockFocus = jest.fn();
  });

  test('주어진 조건을 충족하지 않는 경우', () => {
    expect(conditionValidator(false, mockFocus)).toBe(false);
    expect(mockFocus).toBeCalled();
  });
  test('주어진 조건을 충족한 경우', () => {
    expect(conditionValidator(true, mockFocus)).toBe(true);
    expect(mockFocus).toBeCalledTimes(0);
  });
});
