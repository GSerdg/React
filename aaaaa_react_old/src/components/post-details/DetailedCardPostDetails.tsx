import { useGetPeopleByIdQuery } from '../api/people';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { DetailedCard } from '../card-details/DetailedCard';
import { useEffect } from 'react';
import { setIsFetchingDetailed } from '../../app/apiSlice';
import { useDispatch } from 'react-redux';

export default function DetailedCardPostDetails() {
  const { cardId } = useParams();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetPeopleByIdQuery(
    cardId ?? skipToken
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
