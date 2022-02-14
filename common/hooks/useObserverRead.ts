import { useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { storeContext } from 'common/context/storeContext';

let ids = new Set<string>();
let timeout: NodeJS.Timeout;

const useObserverRead = (url: string) => {
  const { refetchAll } = useContext(storeContext);

  const listRef = useRef<HTMLUListElement>(null);
  const childrenRefs = useRef<HTMLLIElement[]>([]);

  const [obs, setObs] = useState<IntersectionObserver>();

  useEffect(() => {
    ids.clear();
    clearTimeout(timeout);

    const callback = (elements: IntersectionObserverEntry[]) => {
      clearTimeout(timeout);

      elements.forEach(el => {
        if (el.isIntersecting) {
          ids.add(el.target.id);
        }
      });

      timeout = setTimeout(() => {
        axios.post(url, {
          ids: Array.from(ids),
        });
        refetchAll();
      }, 500);
    };

    setObs(
      new IntersectionObserver(callback, {
        root: listRef.current,
        threshold: 0.5,
      })
    );
  }, [refetchAll, url]);

  useEffect(() => {
    childrenRefs.current.forEach(child => obs?.observe(child));

    return () => {
      obs?.disconnect();
    };
  }, [obs, childrenRefs]);

  return { listRef, childrenRefs };
};

export default useObserverRead;
