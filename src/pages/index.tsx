import { useEffect, type ReactElement } from 'react';
import HomeLayout from '@/components/layouts/HomeLayout';
import type { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import navigateToPage from '@/shared/navigate';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const inputValue = localStorage.getItem('inputValue') || '';
    const pageNumber = 1;
    navigateToPage(router, inputValue, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Page;

export async function getStaticProps() {
  return {
    props: {},
  };
}
