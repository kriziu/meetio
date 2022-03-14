import axios from 'axios';
import { MouseEvent } from 'react';

export const handleLikeClick = (
  e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent> | null,
  _id: string,
  setLoading: (value: boolean) => void,
  refetchAll: () => Promise<unknown>,
  mutate: () => Promise<unknown>
) => {
  e && e.stopPropagation();

  setLoading(true);

  axios.post('/api/post/like', { postId: _id }).then(() => {
    new Promise(resolve => {
      let made = 0;

      const helper = () => {
        made++;
        if (made === 1) resolve('success');
      };

      mutate().then(helper);
      refetchAll().then(helper);
    }).then(() => setLoading(false));
  });
};
