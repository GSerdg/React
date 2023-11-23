import { NextPageWithLayout } from '@/pages/_app';
import { DetailedCards } from '@/components/card-details/DetailedCard';
import HomeLayout from '@/components/layouts/HomeLayout';
import CardsLayout from '@/components/layouts/CardsLayout';
import { ReactElement } from 'react';

const OutletDetailedCards: NextPageWithLayout = () => {
  return <DetailedCards />;
};

OutletDetailedCards.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      <CardsLayout>{page}</CardsLayout>
    </HomeLayout>
  );
};

export default OutletDetailedCards;
