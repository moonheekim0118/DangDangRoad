import React from 'react';
import useLoginCheck from 'hooks/useLoginCheck';
import withAuth from 'helpers/withAuth';
import getAuthentication from 'libs/getAuthentication';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getAuthentication(context);

const myPage = (props) => {
  useLoginCheck(props.authenticated);

  return <></>;
};

export default withAuth(myPage);
