import { NextPageWithLayout } from '@/pages/_app';
import { DetailedCards } from '@/components/card-details/DetailedCard';
import HomeLayout from '@/components/layouts/HomeLayout';
import CardsLayout from '@/components/layouts/CardsLayout';
import { ReactElement } from 'react';
import { wrapper } from '@/store/store';
import {
  getAllPeople,
  getPeopleById,
  getRunningQueriesThunk,
} from '@/components/api/people';

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    const name = context.params?.searchParams;

    if (typeof name === 'string') {
      store.dispatch(getAllPeople.initiate(name));
    }

    if (typeof id === 'string') {
      store.dispatch(getPeopleById.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default OutletDetailedCards;
