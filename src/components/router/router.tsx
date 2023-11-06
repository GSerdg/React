import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';
import Home from '../../pages/home/Home';
import CardDetails from '../card-details/CardDetails';
import App from '../../App';

export const PATHS = {
  HOME: '/',
  PAGE: ':page',
  DETAILS: ':card',
  NOT_FPUND: 'not_found',
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.HOME} element={<App />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path={PATHS.PAGE} element={<Home />}>
        <Route path={PATHS.DETAILS} element={<CardDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
