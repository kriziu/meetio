import { Dispatch, SetStateAction, useState } from 'react';

import Spinner, { BigSpinner } from 'common/components/Spinner';

export const useSpinner = (): [
  () => JSX.Element,
  Dispatch<SetStateAction<boolean>>,
  boolean
] => {
  const [loading, setLoading] = useState(false);

  const RenderSpinner = () => <Spinner loading={loading} />;

  return [RenderSpinner, setLoading, loading];
};

export const useBigSpinner = (): [
  () => JSX.Element,
  Dispatch<SetStateAction<boolean>>
] => {
  const [loading, setLoading] = useState(false);

  const RenderSpinner = () => <BigSpinner loading={loading} />;

  return [RenderSpinner, setLoading];
};
