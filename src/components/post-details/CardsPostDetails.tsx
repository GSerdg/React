import Card from '../card/Card';
import NotFound from '../../pages/not-found/NotFound';
import { useGetAllPeopleQuery } from '../api/people';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from '../../shared/useSelector';

interface CardsPostDetailsProps {
  fetchParams: string | undefined;
}

export default function CardsPostDetails(props: CardsPostDetailsProps) {
  const cardsPerPage = useSelector((state) => state.cards.cardsPerPageValue);

  const { data, isFetching, error } = useGetAllPeopleQuery(
    props.fetchParams ?? skipToken
  );

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
    const cardsList = data.results.map((item, index) => {
      if (index < cardsPerPage) {
        return <Card cardData={item} key={item.url} />;
      }
    });
    return cardsList.length !== 0 ? cardsList : <NotFound />;
  }
  return null;
}
