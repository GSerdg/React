import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import navigateToPage from '../../shared/navigate';
import DetailedCardPostDetails from '../post-details/DetailedCardPostDetails';
import { useSelector } from '../../shared/useSelector';
import { useRouter } from 'next/router';

/* interface DetailedCardsContext {
  currentPage: number;
}
 */
export function DetailedCards() {
  const currentPage = useSelector((state) => state.cards.currentPage);
  const inputValue = useSelector((state) => state.input.inputValue);
  const router = useRouter();

  return (
    <div className="card-details" data-testid={'cardDetailsContainer'}>
      <Button
        onHandleClick={() => {
          navigateToPage(router, inputValue, currentPage as number);
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
