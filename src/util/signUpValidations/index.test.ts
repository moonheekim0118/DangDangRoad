import {
  checkLength,
  checkEmail,
  checkEmptySpace,
  allowEmptySpaceinMiddle,
  checkSpecialChars,
  nicknameValidator,
  nicknameValidatorForUpdate,
  passwordValidator,
  passwordCheckValidator,
} from '.';

describe('check length of string by given max and min', () => {
  test('when string length is greater than maximum num', () => {
    expect(
      checkLength('Lorem ipsum dolor sit amet, consectetuer adipiscing', 50, 10)
    ).toBe(false);
  });
  test('when string length is smaller than minimun num', () => {
    expect(checkLength('Lorem ips', 50, 10)).toBe(false);
  });
  test('when string length is greater than minimun num and smaller than maximum num', () => {
    expect(
      checkLength('Lorem ipsum dolor sit amet, consectetuer', 50, 10)
    ).toBe(true);
  });
});

describe('check if string is email format', () => {
  test('when it is not a email format', () => {
    expect(checkEmail('thisisNotEmail')).toBe(false);
  });
  test('when it is email format', () => {
    expect(checkEmail('this@email.com')).toBe(true);
  });
});

describe('check if there is no Empty space in string', () => {
  test('when there is empty space in the middle of string', () => {
    expect(checkEmptySpace('there is Empty')).toBe(false);
  });
  test('when there is empty space in prefix of string', () => {
    expect(checkEmptySpace(' thereisEmpty')).toBe(false);
  });
  test('when there is empty space in postfix of string', () => {
    expect(checkEmptySpace('thereisEmpty ')).toBe(false);
  });
  test('when there is no empty string', () => {
    expect(checkEmptySpace('noEmptySpace')).toBe(true);
  });
});

describe('check if there is empty space only in the middle of string', () => {
  test('when there is empty space in prefix and middle', () => {
    expect(allowEmptySpaceinMiddle(' Lorem ips')).toBe(false);
  });
  test('when there is empty space in postfix and middle', () => {
    expect(allowEmptySpaceinMiddle('Lorem ips ')).toBe(false);
  });
  test('when there is empty space in prefix and postifx', () => {
    expect(allowEmptySpaceinMiddle(' Loremips ')).toBe(false);
  });
  test('when tehre is no empty space', () => {
    expect(allowEmptySpaceinMiddle('Loremips')).toBe(true);
  });
  test('when there is empty space only in the middle', () => {
    expect(allowEmptySpaceinMiddle('Lore mips')).toBe(true);
  });
});

describe('check if there is no special characters in string', () => {
  test('when there is special character', () => {
    expect(checkSpecialChars('Lorem!ipsum dolor sit amet')).toBe(false);
  });

  test('when there is no special characters', () => {
    expect(checkSpecialChars('Lorem ipsum dolor sit amet')).toBe(true);
  });
});

describe('check if a string meet the condition of nickname', () => {
  test('when string length is greater than 20', () => {
    expect(nicknameValidator('Lorem ipsum dolor sit amet')).toBe(false);
  });
  test('when string length is smaller than 1', () => {
    expect(nicknameValidator('')).toBe(false);
  });
  test('when there is speical character', () => {
    expect(nicknameValidator('!!Lorem')).toBe(false);
  });
  test('when there is empty space', () => {
    expect(nicknameValidator(' Lorem')).toBe(false);
  });
  test('when a string meet the condition', () => {
    expect(nicknameValidator('Lorem')).toBe(true);
  });
});

describe('check if a string meet the condition of nickname for update', () => {
  test('when string length is greater than 20', () => {
    expect(nicknameValidatorForUpdate('Lorem ipsum dolor sit amet')).toBe(
      false
    );
  });
  test('when there is speical character', () => {
    expect(nicknameValidatorForUpdate('!!Lorem')).toBe(false);
  });
  test('when there is empty space', () => {
    expect(nicknameValidatorForUpdate(' Lorem')).toBe(false);
  });
  test('when string is empty', () => {
    expect(nicknameValidatorForUpdate('')).toBe(true);
  });
  test('when a string meet the condition', () => {
    expect(nicknameValidatorForUpdate('Lorem')).toBe(true);
  });
});

describe('check if a string meet the condition of password', () => {
  test('when string length is smaller than 6', () => {
    expect(passwordValidator('Lorem')).toBe(false);
  });
  test('when string length is greater than 16', () => {
    expect(passwordValidator('LoremipsumdolorLoremipsumdolor')).toBe(false);
  });
  test('when there is empty space', () => {
    expect(passwordValidator('Lorem ipsum')).toBe(false);
  });
  test('when a string meet the condition', () => {
    expect(passwordValidator('Loremipsum!')).toBe(true);
  });
});

describe('check if two strings are the same', () => {
  test('when two strings have different case letters', () => {
    expect(passwordCheckValidator('Lorem')('lorem')).toBe(false);
  });
  test('when two strings are different', () => {
    expect(passwordCheckValidator('Lorem')('rorem')).toBe(false);
  });
  test('when to strings are same', () => {
    expect(passwordCheckValidator('Lorem')('Lorem')).toBe(true);
  });
});
