import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DetailedCards from './components/card-details/DetailedCards';
import './index.css';
import ErrorComponent from './components/error-component/ErrorComponent';
import CardsWrapper from './components/cards/CardsWrapper';
import App from './App';

export const PATHS = {
  HOME: '/',
  PAGE: ':page',
  DETAILS: ':cardId',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={PATHS.HOME}
      element={<App />}
      errorElement={<ErrorComponent />}
    >
      <Route index element={<CardsWrapper />} />
      <Route path={PATHS.PAGE} element={<CardsWrapper />}>
        <Route path={PATHS.DETAILS} element={<DetailedCards />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
