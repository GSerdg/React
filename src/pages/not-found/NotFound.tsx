import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Page not found</h2>
      <Button
        onHandleClick={() => {
          localStorage.setItem('inputValue', '');
          navigate('/page=1');
        }}
        title={'Back to home'}
      />
    </>
  );
}
