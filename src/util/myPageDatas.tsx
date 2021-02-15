import Icon from 'atoms/Icon';
import {
  faFileAlt,
  faEdit,
  faUserCircle,
  faSadTear,
} from '@fortawesome/free-regular-svg-icons';

export const GeneralMenu = [
  {
    key: 0,
    icon: <Icon iconsize={20} icon={faFileAlt} />,
    title: 'My reviews',
    href: '/myPage',
  },
  {
    key: 1,
    icon: <Icon iconsize={20} icon={faUserCircle} />,
    title: 'update profile',
    href: '/myPage/updateProfile',
  },
  {
    key: 2,
    icon: <Icon iconsize={20} icon={faEdit} />,
    title: 'update password',
    href: '/myPage/updatePassword',
  },
];

export const DestoryMenu = [
  {
    key: 3,
    icon: <Icon iconsize={20} icon={faSadTear} color="red" />,
    title: 'destroy account',
  },
];
