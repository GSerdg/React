/* import { wrapper } from '@/store/store';
import {
  getAllPeople,
  getRunningQueriesThunk,
} from '../../components/api/people';
import OutletCards from '../[searchParams]/index';

export default OutletCards;

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
 */
