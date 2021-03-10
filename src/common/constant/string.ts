import { FREE_TEXT_LIMIT } from 'common/constant/number';

export const UPDATE_MESSAGE = '수정 되었습니다';
export const DEFAULT_ERROR = '잠시 후에 다시 시도해주세요';
export const EMAIL_ALREADY_IN_USE_ERROR = '이미 사용중인 이메일 입니다';
export const WRONG_PASSWORD_ERROR = '잘못된 비밀번호 입니다.';
export const USER_NOT_FOUND_ERROR = '존재하지 않는 이메일 입니다';
export const NOT_VERIFIED_ERROR = '이메일 인증을 완료해주세요';
export const NOT_EXISTS_DATA = '존재하지 않는 페이지입니다';
export const IMAGE_LIMIT_ERROR = (limit: number) =>
  `이미지는 최대 ${limit}장까지 업로드 가능합니다`;
export const NOT_FULL_INFO_ERROR = '정보를 올바르게 입력해주세요';
export const NOT_SELECT_PLACE_ERROR = '장소를 선택해주세요';
export const FREE_TEXT_LIMIT_ERROR = `글자수는 ${FREE_TEXT_LIMIT}자 이하까지 입력 가능합니다.`;
export const NO_SEARCH_RESULT_ERROR = '검색결과가 없습니다';
export const NO_KEYWORD_ERROR = '검색어를 입력해주세요';
export const PAGE_LEAVE_WARNING =
  '변경사항이 저장되지 않습니다. 나가시겠습니까?';

export const EMPTY_USER_NICKNAME = '탈퇴한 사용자';
export const FOOTER_CONTENTS = 'Copyright © moonhee kim dangdang road';

export const MENU_MYPAGE_TITLE = '마이페이지';
export const MENU_LOGOUT_TITLE = '로그아웃';
export const MENU_LOGIN_TITLE = '로그인';
export const MENU_SIGNUP_TITLE = '회원가입';

export const MAP_SEARCH_PLACEHOLDER =
  '키워드로 검색하세요! 예) 광명 애견운동장';
export const REVIEW_SEARCH_PLACEHODLER =
  '지역명을 입력하세요. 예) 강원도 속초시';

export const DESTROY_ACCOUNT_CAPTION = '정말 계정을 삭제하시겠습니까?';

export const MYPAGE_MENU_DEFAULT = '내가 작성한 리뷰';
export const MYPAGE_MENU_UPDATE_PASSWORD = '비밀번호 변경';
export const MYPAGE_MENU_UPDATE_PROFILE = '회원정보 변경';
export const MYPAGE_MENU_DESTROY_ACCOUNT = '계정 삭제';

export const MYPAGE_DEFAULT_QUERY = 'myReviews';
export const MYPAGE_UPDATE_PASSWORD_QUERY = 'updatePassword';
export const MYPAGE_UPDATE_PROFILE_QUERY = 'updateProfile';

export const MYPAGE_NAVIGATOR = {
  myReviews: MYPAGE_MENU_DEFAULT,
  updatePassword: MYPAGE_MENU_UPDATE_PASSWORD,
  updateProfile: MYPAGE_MENU_UPDATE_PROFILE,
};

export const WRITE_REVIEW_BUTTON_CAPTION = '리뷰 작성하기';
export const WRITE_REVIEW_TITLE = '리뷰 작성';
export const IMAGE_UPLOAD_LABEL = '사진 업로드📸';
export const IMAGE_UPLOAD_DESC = '(최대 3장까지 업로드 가능합니다)';
export const FREE_TEXT_LABEL = '자유롭게 장소에 대해 적어주세요 ✨';
export const RADIO_BOX_LABEL = '장소에대해 알려주세요 🌠';
export const RADIO_TITLE_PARKING_LOT = '주차장이 있나요?';
export const RADIO_TITLE_OFFLEASH = '오프리쉬 가능한가요?';
export const RADIO_TITLE_RECOMMENDATION = '다른 멍멍이들에게 추천하나요?';

export const DEFAULT_KEYWORD = '강아지 산책로';

export const PARKING_LOT_CAPTION = '✅ 주차장 ';
export const OFFLEASH_CAPTION = '✅ 오프리쉬 ';
export const RECOMMENDATION_CAPTION = '🐶 ';

export const SAVE_CAPTION = '저장하기';
export const UPDATE_BUTTON_CAPTION = '수정하기';
export const DELETE_BUTTON_CAPTION = '삭제하기';
export const SEARCH_BUTTON_CAPTION = '검색';

export const EMAIL_VERFY_TITLE = '이메일 인증';
export const EMAIL_VERFY_DESC =
  '가입하신 메일로 인증 메일을 보냈습니다. 인증을 완료해주세요';

export const CLOSE_BUTTON_CAPTION = '닫기';
export const KEEP_BUTTON_CAPTION = '계속';
export const SIGNUP_BUTTON_CAPTION = '가입하기';
export const GOOGLE_LOGIN_CAPTION = '구글 로그인하기';

export const RAIDO_HAS_YES_VALUE = '있어요';
export const RAIDO_HAS_NO_VALUE = '없어요';
export const RAIDO_HAS_DONTKNOW_VALUE = '몰라요';
export type RADIO_PARKING_LOT_TYPE = '있어요' | '없어요' | '몰라요';

export const RAIDO_AVAILABLE_YES_VALUE = '가능해요';
export const RAIDO_AVAILABLE_NO_VALUE = '불가능해요';
export const RAIDO_AVAILABLE_DONTKNOW_VALUE = '몰라요';
export type RADIO_OFFLEASH_TYPE = '가능해요' | '불가능해요' | '몰라요';

export const RAIDO_RECOMMENDATION_GOOD_VALUE = '추천해요';
export const RAIDO_RECOMMENDATION_SOSO_VALUE = '그럭저럭이에요';
export const RAIDO_RECOMMENDATION_BAD_VALUE = '별로예요';
export type RADIO_RECOMMENDATION_TYPE =
  | '추천해요'
  | '그럭저럭이에요'
  | '별로예요';

export const RADIO_LIST = {
  has: [
    { id: 'yes', value: RAIDO_HAS_YES_VALUE },
    { id: 'no', value: RAIDO_HAS_NO_VALUE },
    { id: 'dontknow1', value: RAIDO_HAS_DONTKNOW_VALUE },
  ],
  available: [
    { id: 'available', value: RAIDO_AVAILABLE_YES_VALUE },
    { id: 'notAvailable', value: RAIDO_AVAILABLE_NO_VALUE },
    { id: 'dontknow2', value: RAIDO_AVAILABLE_DONTKNOW_VALUE },
  ],
  recomendation: [
    { id: 'good', value: RAIDO_RECOMMENDATION_GOOD_VALUE },
    { id: 'soso', value: RAIDO_RECOMMENDATION_SOSO_VALUE },
    { id: 'bad', value: RAIDO_RECOMMENDATION_BAD_VALUE },
  ],
};
