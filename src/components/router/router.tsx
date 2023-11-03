import { Route, Routes } from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';
import { PeopleResult } from '../../types/types';
import Cards from '../cards/Cards';

export const PATHS = {
  HOME: '/',
  NESTED_HOME: '/:page',
};

export const router = (
  isLoading: boolean,
  people: PeopleResult[] | undefined
) => (
  <Routes>
    <Route
      index
      path={PATHS.NESTED_HOME}
      element={
        isLoading ? <div>Loading...</div> : <Cards respData={people || []} />
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
