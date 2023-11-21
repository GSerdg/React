import { useNavigate, useOutletContext } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import DetailedCardPostDetails from '../post-details/DetailedCardPostDetails';
import './DetailedCard.css';

interface DetailedCardsContext {
  currentPage: number;
}

export function DetailedCards() {
  const context = useOutletContext<DetailedCardsContext>();
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const navigate = useNavigate();

  return (
    <div className="card-details" data-testid={'cardDetailsContainer'}>
      <Button
        onHandleClick={() => {
          navigateToPage(navigate, inputValue, context.currentPage);
        }}
        title={'Close'}
      />
      <DetailedCardPostDetails />
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
