import React, { useState, useEffect } from 'react';

interface Props {
  end: number;
  duration: number;
}

const Counter = ({ end, duration }: Props) => {
  const [count, setCount] = useState<string>('0');

  useEffect(() => {
    let start = 0;
    if (start !== end) {
      const incerementTime = (Math.floor(duration) / end) * 1000;
      const changer = setInterval(() => {
        start += 1;
        setCount(start.toString());
        if (start === end) return clearInterval(changer);
      }, incerementTime);
    }
  }, [end, duration]);

  return <span>{count}</span>;
};

export default Counter;
