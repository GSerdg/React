import { PeopleResult } from '../../types/types';
import './card.css';

interface CardProps {
  onHandleCardClick?: (link: string) => void;
  cardData: PeopleResult;
  counter?: number;
  isDetails?: boolean;
}

export default function Card(props: CardProps) {
  let dataTitle = ['gender', 'birth year'];

  if (props.isDetails) {
    dataTitle = [
      'gender',
      'birth year',
      'height',
      'eye color',
      'hair color',
      'mass',
      'skin color',
    ];
  }

  const elements = dataTitle.map((item, index) => {
    const propsName = item.split(' ').join('_') as keyof PeopleResult;
    return (
      <p className="description__title" key={index}>
        {item}: {props.cardData[propsName]}
      </p>
    );
  });

  function handleCardClick() {
    props.onHandleCardClick && props.onHandleCardClick(props.cardData.url);
  }

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="name">
        <h3 className="name__title">{props.cardData.name}</h3>
      </div>
      <div className="description">{elements}</div>
    </div>
  );
}
