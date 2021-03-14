import Icon from 'atoms/Icon';
import { css } from '@emotion/react';

import {
  MYPAGE_MENU_DEFAULT,
  MYPAGE_MENU_UPDATE_PASSWORD,
  MYPAGE_MENU_UPDATE_PROFILE,
  MYPAGE_MENU_DESTROY_ACCOUNT,
} from 'common/constant/string';
import routes from 'common/constant/routes';
import {
  faFileAlt,
  faEdit,
  faUserCircle,
  faSadTear,
} from '@fortawesome/free-regular-svg-icons';

const destroyStyle = css`
  color: red;
`;

export const GeneralMenu = [
  {
    key: 0,
    icon: <Icon icon={faFileAlt} size="medium" />,
    title: MYPAGE_MENU_DEFAULT,
    href: routes.MYPAGE,
  },
  {
    key: 1,
    icon: <Icon icon={faUserCircle} size="medium" />,
    title: MYPAGE_MENU_UPDATE_PROFILE,
    href: routes.MYPAGE_UPDATE_PROFILE,
  },
  {
    key: 2,
    icon: <Icon icon={faEdit} size="medium" />,
    title: MYPAGE_MENU_UPDATE_PASSWORD,
    href: routes.MYPAGE_UPDATE_PASSWORD,
  },
];

export const DestoryMenu = [
  {
    key: 3,
    icon: <Icon icon={faSadTear} size="medium" style={destroyStyle} />,
    title: MYPAGE_MENU_DESTROY_ACCOUNT,
  },
];
