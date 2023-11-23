import Cards from '@/components/cards/Cards';
import { NextPageWithLayout } from '@/pages/_app';
import HomeLayout from '@/components/layouts/HomeLayout';
import { ReactElement } from 'react';

const OutletCards: NextPageWithLayout = () => {
  return <Cards />;
};

OutletCards.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default OutletCards;
