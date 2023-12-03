import { useRouteError } from 'react-router-dom';
import NotFound from '../../pages/not-found/NotFound';

export default function ErrorComponent() {
  const error = useRouteError();
  console.error(error);

  return <NotFound />;
}
