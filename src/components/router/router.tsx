import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';
import Home from '../../pages/home/Home';
import CardDetails from '../card-details/CardDetails';
import Cards from '../cards/Cards';

export const PATHS = {
  HOME: '/',
  PAGE: ':page',
  DETAILS: ':cardId',
  NOT_FPUND: 'not_found',
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.HOME} element={<Home />} errorElement={<NotFound />}>
      <Route index element={<Cards />} />
      <Route path={PATHS.PAGE} element={<Cards />}>
        <Route path={PATHS.DETAILS} element={<CardDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
