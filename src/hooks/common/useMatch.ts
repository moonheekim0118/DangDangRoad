import { useEffect, useState } from 'react';

interface Props {
  /** comparison value */
  value: string;
  /** comparison target */
  target: string;
}

/** this custom hooks will tell if two string values matches or not */
const useMatch = ({ value, target }: Props) => {
  const [match, setMatch] = useState<boolean>(value === target);

  useEffect(() => {
    setMatch(value === target);
  }, [value, target]);

  return match;
};

export default useMatch;
