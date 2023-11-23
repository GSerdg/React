import { useRouter } from 'next/router';
import Button from '@/components/button/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <h2>Not found</h2>
      <Button
        onHandleClick={() => {
          localStorage.setItem('inputValue', '');
          router.push('/page=1');
        }}
        title={'Back to home'}
      />
    </>
  );
}
