import { type ReactElement } from 'react';
import HomeLayout from '@/components/layouts/HomeLayout';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return <></>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Page;
