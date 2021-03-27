import React from 'react';

const Error = ({ statusCode }) => {
  return (
    <h1>
      {statusCode
        ? '서버에 문제가 생겼습니다. 죄송합니다.'
        : '존재하지 않는 페이지 입니다.'}
    </h1>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
