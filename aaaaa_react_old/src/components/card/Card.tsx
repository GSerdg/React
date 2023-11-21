import { useNavigate } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import './card.css';

interface CardProps {
  cardData: PeopleResult;
}

export default function Card(props: CardProps) {
  const navigate = useNavigate();

  const dataTitle = ['gender', 'birth year'];

  const elements = dataTitle.map((item, index) => {
    const propsName = item.split(' ').join('_') as keyof PeopleResult;
    return (
      <p className="description__title" key={index}>
        {item}: {props.cardData[propsName]}
      </p>
    );
  });

  const peopleId = props.cardData.url.match(/\d+/);
  return (
    <div
      data-testid="people-card"
      className="card card_active"
      onClick={() => {
        navigate(`./${peopleId}`);
      }}
    >
      <div className="name">
        <h3 className="name__title">{props.cardData.name}</h3>
      </div>
      <div className="description">{elements}</div>
    </div>
  );
}
