import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { DetailedCards } from './components/card-details/DetailedCard';
import './index.css';
import ErrorComponent from './components/error-component/ErrorComponent';
import { Provider } from 'react-redux';
import App from './App';
import { setupStore } from './app/store';
import Cards from './components/cards/Cards';

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
      <Route index element={<Cards />} />
      <Route path={PATHS.PAGE} element={<Cards />}>
        <Route path={PATHS.DETAILS} element={<DetailedCards />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
