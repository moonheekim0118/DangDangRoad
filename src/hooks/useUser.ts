import useSWR from 'swr';
import axios from 'axios';

interface Props {
  userId: string;
}

const fetcher = (url) => axios.get(url).then((result) => result.data);

const useUser = ({ userId }: Props) => {
  const { data: userInfo, error: userInfoError } = useSWR(
    `${process.env.BASE_API_URL}/api/user/${userId}`,
    fetcher
  );

  return [userInfo, userInfoError] as const;
};

export default useUser;
