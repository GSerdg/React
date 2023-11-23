import { useGetPeopleByIdQuery } from '../api/people';
import { skipToken } from '@reduxjs/toolkit/query';
import { DetailedCard } from '../card-details/DetailedCard';
import { useEffect } from 'react';
import { setIsFetchingDetailed } from '../../store/apiSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function DetailedCardPostDetails() {
  const router = useRouter();
  console.log(router);
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetPeopleByIdQuery(
    (router.query.id as string) ?? skipToken
  );

  useEffect(() => {
    dispatch(setIsFetchingDetailed(isFetching));
  }, [dispatch, isFetching]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
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
