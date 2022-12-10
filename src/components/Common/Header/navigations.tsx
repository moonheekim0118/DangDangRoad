import { memo } from 'react';
import { Link } from 'components/UI';
import {
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
  MENU_WRITE_REVIEW_TITLE,
} from 'common/constant/string';
import routes from 'common/constant/routes';

export const SignUpLink = memo(() => {
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
});

export const LoginLink = memo(() => {
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
});

export const WriteReviewLink = memo(() => {
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
});
