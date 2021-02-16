export enum inputId {
  EMAIL = 'EMAIL',
  NICKNAME = 'NICKNAME',
  PASSWORD = 'password',
  PASSWORDCHECK = 'PASSWORDCHECK',
  NOWPASSWORD = 'nowPassword',
  NEWPASSWORD = 'newPassword',
}

export const inputContents = {
  [inputId.EMAIL]: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요!',
    error: '올바른 이메일을 입력해주세요.',
  },
  [inputId.NICKNAME]: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요!',
    error: '2자~10자 영문, 한글 ,숫자를 사용하세요. ',
  },
  [inputId.PASSWORD]: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요!',
    error: '6~16자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요.',
  },
  [inputId.PASSWORDCHECK]: {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 확인해주세요!',
    error: '비밀번호가 일치하지 않습니다.',
  },
  [inputId.NOWPASSWORD]: {
    label: '기존 비밀번호',
    placeholder: '기존 비밀번호를 입력해주세요.',
    error: '비밀번호가 일치하지 않습니다.',
  },
  [inputId.NEWPASSWORD]: {
    label: '새로운 비밀번호',
    placeholder: '새로운 비밀번호를 입력해주세요.',
    error: '6~16자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요.',
  },
};
