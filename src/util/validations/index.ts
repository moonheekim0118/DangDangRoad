/**
 * 길이 Validator
 * 주어진 value의 길이가 max 이하이고, min 이상인지 검증
 */
export const lengthValidator = (
  value: string,
  max: number,
  min: number
): boolean => {
  if (value.length > max || value.length < min) return false;
  return true;
};

/**
 * 이메일 validator
 * 주어진 email이 이메일 형식인지 검증
 */
export const emailValidator = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

/**
 * 공백 validator
 * 주어진 value에 공백이 포함되어있는지 검증
 */
export const emptySpaceValidator = (value: string): boolean => {
  const re = /\s/;
  return !re.test(value);
};

/**
 * 앞, 뒤(prefix, postfix) 공백 validator
 * 주어진 value의 앞, 뒤에 공백이 포함되어있는지 검증
 * 중간에 포함된 공백 허용
 */
export const emptyFixValidator = (value: string): boolean => {
  const re = /^[^\s]+(\s+[^\s]+)*$/;
  return re.test(value);
};

/**
 * 특수문자 validator
 * 주어진 value에 특수문자가 포함되어있는지 검증
 */
export const specialCharsValidator = (value: string): boolean => {
  const re = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  return !re.test(value);
};

/**
 * 로그인 validator
 * 주어진 email 길이과 password길이 그리고 email인지 여부 확인
 */
export const loginValidator = (email: string, passoword: string): boolean => {
  return email.length > 0 && passoword.length > 0 && emailValidator(email);
};

/**
 * 닉네임 validator
 */
export const nicknameValidator = (value: string): boolean => {
  return (
    lengthValidator(value, 20, 2) &&
    specialCharsValidator(value) &&
    emptyFixValidator(value)
  );
};

/**
 * 닉네임 수정 시 validator
 * 길이가 0 이라면 바꾸지 않는 것으로 판단
 */
export const nicknameValidatorForUpdate = (value: string): boolean => {
  if (value.length === 1 && !emptySpaceValidator(value)) return true;
  return (
    lengthValidator(value, 20, 0) &&
    specialCharsValidator(value) &&
    emptySpaceValidator(value)
  );
};

/**
 * 비밀번호 validator
 * 비밀번호 길이 및 공백 여부 검증
 */
export const passwordValidator = (value: string): boolean => {
  return lengthValidator(value, 16, 6) && emptySpaceValidator(value);
};

/**
 * 비밀번호 확인 validator
 * 두개의 비밀번호가 같은지 검증
 */
export const passwordCheckValidator = (target: string) => (
  value: string
): boolean => {
  return target === value;
};

/**
 * 주어진 조건 validator
 * 조건이 맞다면 false 반환
 * 조건이 틀리다면 focus 함수 실행 후, true 반환
 */
export const conditionValidator = (
  condition: boolean,
  focus?: () => void
): boolean => {
  if (condition) return false;
  focus && focus();
  return true;
};
