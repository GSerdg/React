import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { PATHS } from '../../main';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Page not found</h2>
      <Button
        onHandleClick={() => {
          navigate(PATHS.HOME);
        }}
        title={'Back to home'}
      />
    </>
  );
}
