import Cards from '@/components/cards/Cards';
import { NextPageWithLayout } from '@/pages/_app';
import HomeLayout from '@/components/layouts/HomeLayout';
import { ReactElement } from 'react';
import { wrapper } from '@/store/store';
import { getAllPeople, getRunningQueriesThunk } from '@/components/api/people';

const OutletCards: NextPageWithLayout = () => {
  return <Cards />;
};

OutletCards.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.searchParams;
    if (typeof name === 'string') {
      store.dispatch(getAllPeople.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default OutletCards;
