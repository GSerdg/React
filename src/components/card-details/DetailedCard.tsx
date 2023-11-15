import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import { createContext, useContext, useEffect, useState } from 'react';
import PeopleService from '../api/people';
import navigateToPage from '../../shared/navigate';
import { InputContext } from '../../pages/home/Home';
import './DetailedCard.css';

interface DetailedCardsContext {
  currentPage: number;
}

interface CardData {
  detailedCard: PeopleResult | undefined;
}

export const CardDataContext = createContext<CardData | undefined>(undefined);

export function DetailedCards() {
  const context = useOutletContext<DetailedCardsContext>();
  const inputContext = useContext(InputContext);

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
    <CardDataContext.Provider value={{ detailedCard }}>
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

export function DetailedCard() {
  const cardDataContext = useContext(CardDataContext);
  const cardData = cardDataContext?.detailedCard;

  const dataTitle = [
    'gender',
    'birth year',
    'height',
    'eye color',
    'hair color',
    'mass',
    'skin color',
  ];

  if (!cardData) return null;

  const elements = dataTitle.map((item, index) => {
    const propsName = item.split(' ').join('_') as keyof PeopleResult;
    return (
      <p className="description__title" key={index}>
        {item}: {cardData[propsName]}
      </p>
    );
  });

  return (
    <div className="card" data-testid="detailed-card">
      <div className="name">
        <h3 className="name__title">{cardData.name}</h3>
      </div>
      <div className="description">{elements}</div>
    </div>
  );
}
