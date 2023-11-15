import { useContext } from 'react';
import { PeopleResult } from '../../types/types';
import { CardDataContext } from '../card-details/DetailedCard';

export default function DetailedCard() {
  const cardDataContext = useContext(CardDataContext);
  const cardData = cardDataContext.detailedCard;

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
