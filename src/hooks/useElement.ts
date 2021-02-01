import { useState, useEffect } from 'react';

const useDocument = (id: string) => {
  const [element, setElement] = useState<Element | null>();

  useEffect(() => {
    setElement(document.querySelector(`#${id}`));
  }, []);

  return element;
};

export default useDocument;
