import { PeopleResult } from '../../types/types';
import './card.css';

interface CardProps {
  cardData: PeopleResult;
  counter: number;
}

export default function Card(props: CardProps) {
  const dataTitle = [
    'gender',
    'height',
    'birth year',
    'eye color',
    'hair color',
    'mass',
    'skin color',
  ];
  const elements = dataTitle.map((item, index) => {
    const propsName = item.split(' ').join('_') as keyof PeopleResult;
    return (
      <p className="description__title" key={index}>
        {item}: {props.cardData[propsName]}
      </p>
    );
  });

  return (
    <div className="card">
      <div className="name">
        <h3 className="name__title">{props.cardData.name}</h3>
      </div>
      <div className="description">{elements}</div>
    </div>
  );
}
