import { FC, FormEvent, useEffect } from 'react';

import Link from 'next/link';

import { Form } from 'common/components/Form';
import { Header1 } from 'common/components/Headers';
import { PageContainer } from '../styles/Template.elements';
import { Flex } from 'common/components/Flex';
import { Button } from 'common/components/Button';
import { useBigSpinner } from 'common/hooks/useSpinner';

interface Props {
  btnTitle: string;
  redirectTo: string;
  loading: boolean;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Template: FC<Props> = ({
  btnTitle,
  redirectTo,
  handleFormSubmit,
  children,
  loading,
}) => {
  const [Spinner, setLoading] = useBigSpinner();

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return (
    <>
      <Spinner />
      <PageContainer>
        <Header1>{btnTitle}</Header1>
        <Form onSubmit={handleFormSubmit} noValidate>
          {children}
          <Button type="submit">{btnTitle}</Button>
        </Form>
        <Flex>
          <Link href={'/' + redirectTo}>
            <a>{redirectTo[0].toUpperCase() + redirectTo.slice(1)}</a>
          </Link>
        </Flex>
      </PageContainer>
    </>
  );
};

export default Template;
