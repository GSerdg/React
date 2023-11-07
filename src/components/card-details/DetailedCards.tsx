import { useNavigate, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import { useEffect, useState } from 'react';
import PeopleService from '../api/people';
import DetailedCard from '../card/DetailedCard';
import './DetailedCards.css';

export default function DetailedCards() {
  const [detailedCard, setDetailedCard] = useState<PeopleResult>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { cardId } = useParams();

  useEffect(() => {
    async function getDetailedCard(id: string) {
      try {
        setIsLoading(true);
        const data = await PeopleService.getPeopleById(id);
        setDetailedCard(data);
      } catch (error) {
        console.error(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    cardId && getDetailedCard(cardId);
  }, [cardId]);

  return (
    <div className="card-details">
      <Button onHandleClick={() => navigate('../')} title={'Close'} />
      {isLoading ? (
        <div>Loading...</div>
      ) : detailedCard ? (
        <DetailedCard cardData={detailedCard} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
