import useSWR from 'swr';
import fetcher from 'libs/fetcher';

interface Props {
  userId: string;
}

const useUser = ({ userId }: Props) => {
  const { data: userInfo, error: userInfoError } = useSWR(
    `${process.env.BASE_API_URL}/api/user/${userId}`,
    fetcher
  );

  return [userInfo, userInfoError] as const;
};

export default useUser;
