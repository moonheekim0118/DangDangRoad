import { Link } from 'components/ui';
import {
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
  MENU_WRITE_REVIEW_TITLE,
} from 'common/constant/string';
import routes from 'common/constant/routes';

export const SignUpLink = () => {
  return (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.SIGNUP}>
      {MENU_SIGNUP_TITLE}
    </Link>
  );
};

export const LoginLink = () => {
  return (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.LOGIN}>
      {MENU_LOGIN_TITLE}
    </Link>
  );
};

export const WriteReviewLink = () => {
  return (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.WRITE_REIVEW}>
      {MENU_WRITE_REVIEW_TITLE}
    </Link>
  );
};
