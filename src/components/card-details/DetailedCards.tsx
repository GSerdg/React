import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import { createContext, useEffect, useState } from 'react';
import PeopleService from '../api/people';
import DetailedCard from '../card/DetailedCard';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './DetailedCards.css';

interface DetailedCardsContext {
  isCloseDetailed: boolean;
  currentPage: number;
}

interface CardDataObjContext {
  detailedCard: PeopleResult | undefined;
}

export const CardDataContext = createContext<CardDataObjContext>(
  {} as CardDataObjContext
);

export default function DetailedCards() {
  const context = useOutletContext<DetailedCardsContext>();
  const inputValue = useSelector((state: RootState) => state.input.inputValue);

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

  context.isCloseDetailed &&
    navigateToPage(navigate, inputValue, context.currentPage);

  return (
    <CardDataContext.Provider value={{ detailedCard }}>
      <div className="card-details" data-testid={'cardDetailsContainer'}>
        <Button
          onHandleClick={() =>
            navigateToPage(navigate, inputValue, context.currentPage)
          }
          title={'Close'}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : detailedCard ? (
          <DetailedCard />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </CardDataContext.Provider>
  );
}
