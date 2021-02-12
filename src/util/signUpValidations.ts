/** check if value length is correct
 *  return false if value.length>max or value.length < min
 *  else return true (passed)
 */
export const checkLength = (
  value: string,
  max: number,
  min: number
): boolean => {
  if (value.length > max || value.length < min) return false;
  return true;
};

/** check if if its form of email or not
 *  return true if its form of email (passed)
 *  else return false
 */
export const checkEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

/** check if there is empty space
 *  return true if there is no empty space (passed)
 *  else return false
 */
export const checkEmptySpace = (value: string): boolean => {
  const re = /\s/;
  return !re.test(value);
};

/** check if threre is no any spacial characters
 *  return true if there is no special chrarters (passed)
 *  else return false
 */
export const checkSpecialChars = (value: string): boolean => {
  const re = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-10]+/;
  return re.test(value);
};

export const nicknameValidator = (value: string): boolean => {
  return (
    checkLength(value, 10, 2) &&
    checkSpecialChars(value) &&
    checkEmptySpace(value)
  );
};

export const passwordValidator = (value: string): boolean => {
  return checkLength(value, 16, 6) && checkEmptySpace(value);
};