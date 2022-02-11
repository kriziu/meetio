import { useBigSpinner } from 'common/hooks/useSpinner';
import { createContext, FC } from 'react';

export const loaderContext = createContext<{
  setLoading: React.Dispatch<boolean>;
  loading: boolean;
}>({ setLoading: () => {}, loading: true });

const LoaderProvider: FC = ({ children }) => {
  const [BigSpinner, setLoading, loading] = useBigSpinner();

  return (
    <loaderContext.Provider value={{ setLoading, loading }}>
      <BigSpinner />
      {children}
    </loaderContext.Provider>
  );
};

export default LoaderProvider;
