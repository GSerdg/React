import { useNavigate, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import { useEffect, useState } from 'react';
import PeopleServise from '../api/people';
import CardDetail from '../card/CardDetail';
import './cardDetails.css';

export default function CardDetails() {
  const [detailedCard, setDetailedCard] = useState<PeopleResult>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { cardId } = useParams();

  useEffect(() => {
    async function getDetailedCard(id: string) {
      try {
        setIsLoading(true);
        const data = await PeopleServise.getPeopleById(id);
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
      <Button onHandleClick={() => navigate(-1)} title={'Close'} />
      {isLoading ? (
        <div>Loading...</div>
      ) : detailedCard ? (
        <CardDetail cardData={detailedCard} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
