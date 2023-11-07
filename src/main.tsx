import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DetailedCards from './components/card-details/DetailedCards';
import Cards from './components/cards/Cards';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';
import './index.css';

export const PATHS = {
  HOME: '/',
  PAGE: ':page',
  DETAILS: ':cardId',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.HOME} element={<Home />} errorElement={<NotFound />}>
      <Route index element={<Cards />} />
      <Route path={PATHS.PAGE} element={<Cards />}>
        <Route path={PATHS.DETAILS} element={<DetailedCards />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
