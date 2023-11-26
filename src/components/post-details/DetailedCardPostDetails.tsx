import { useGetPeopleByIdQuery } from '@/components/api/people';
import { skipToken } from '@reduxjs/toolkit/query';
import { DetailedCard } from '@/components/card-details/DetailedCard';
import { useRouter } from 'next/router';

export default function DetailedCardPostDetails() {
  const router = useRouter();

  const { data, error } = useGetPeopleByIdQuery(
    (router.query.id as string) ?? skipToken
  );

  if (error) {
    if ('status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }
  if (data) {
    return <DetailedCard cardData={data} />;
  }
  return null;
}
