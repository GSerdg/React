import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorComponent from './components/error-component/ErrorComponent';
import { Provider } from 'react-redux';
import App from './App';
import { setupStore } from './app/store';
import './index.css';

export const PATHS = {
  HOME: '/',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={PATHS.HOME}
      element={<App />}
      errorElement={<ErrorComponent />}
    ></Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
