/** check if there is Special cases in String
 * if it's including Special cases return true
 */
const checkSpecialCases = (value: string): boolean => {
  /** excluding _ and - */
  const specialChar = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
  return specialChar.test(value);
};

/** check if there is Special Cases  in Id
 * if it's okay return true, else return false
 */
export const passIdValue = (value: string): boolean => {
  const lowerCase = /^[a-z0-9]+$/;
  return lowerCase.test(value) || !checkSpecialCases(value);
};

/** check if there is Special Cases in Nickname
 * if it's okay return true, else return false
 */
export const passNicknameValue = (value: string): boolean => {
  const characters = /^[a-zA-Z0-9]+$/;
  return characters.test(value) || !checkSpecialCases(value);
};
