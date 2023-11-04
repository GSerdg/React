import { Route, Routes } from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';
import Home from '../../pages/home/Home';

export const PATHS = {
  HOME: '/',
  NESTED_HOME: '/:page',
  NOT_FPUND: '/not_found',
};

export const router = () => (
  <Routes>
    <Route index path={PATHS.HOME} element={<Home />} />
    <Route path={PATHS.NESTED_HOME} element={<Home />} />
    <Route path={PATHS.NOT_FPUND} element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
