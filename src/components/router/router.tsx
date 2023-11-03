import { Route, Routes } from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';
import Home from '../../pages/home/Home';

export const PATHS = {
  HOME: '/',
  NESTED_HOME: '/:page',
};

export const router = () => (
  <Routes>
    <Route index path={PATHS.NESTED_HOME} element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
