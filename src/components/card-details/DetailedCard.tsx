import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import { useContext, useEffect, useState } from 'react';
import { useGetPeopleByIdQuery } from '../api/people';
import navigateToPage from '../../shared/navigate';
import { InputContext } from '../../pages/home/Home';
import { skipToken } from '@reduxjs/toolkit/query/react';
import './DetailedCard.css';
import { useDispatch } from 'react-redux';
import { setIsFetchingDetailed } from '../../app/apiSlice';

interface DetailedCardsContext {
  currentPage: number;
}

export function DetailedCards() {
  const context = useOutletContext<DetailedCardsContext>();
  const inputContext = useContext(InputContext);
  const dispatch = useDispatch();

  const [detailedCard, setDetailedCard] = useState<PeopleResult>();

  const navigate = useNavigate();
  const { cardId } = useParams();

  const { data, isFetching } = useGetPeopleByIdQuery(cardId ?? skipToken);

  useEffect(() => {
    setDetailedCard(data);
    dispatch(setIsFetchingDetailed(isFetching));
  }, [data, dispatch, isFetching]);

  return (
    <div className="card-details" data-testid={'cardDetailsContainer'}>
      <Button
        onHandleClick={() => {
          navigateToPage(
            navigate,
            inputContext?.inputValue,
            context.currentPage
          );
        }}
        title={'Close'}
      />
      {isFetching ? (
        <div>Loading...</div>
      ) : detailedCard ? (
        <DetailedCard cardData={detailedCard} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

interface DetailedCardProps {
  cardData: PeopleResult | undefined;
}

export function DetailedCard(props: DetailedCardProps) {
  const dataTitle = [
    'gender',
    'birth year',
    'height',
    'eye color',
    'hair color',
    'mass',
    'skin color',
  ];

  if (!props.cardData) return null;

  const elements = dataTitle.map((item, index) => {
    const propsName = item.split(' ').join('_') as keyof PeopleResult;
    return (
      <p className="description__title" key={index}>
        {item}: {props.cardData?.[propsName]}
      </p>
    );
  });

  return (
    <div className="card" data-testid="detailed-card">
      <div className="name">
        <h3 className="name__title">{props.cardData.name}</h3>
      </div>
      <div className="description">{elements}</div>
    </div>
  );
}
