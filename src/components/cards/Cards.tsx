import { PeopleResult } from '../../types/types';
import Card from '../card/Card';
import './cards.css';

interface CardsProps {
  onHandleCardClick: (link: string) => void;
  respData: PeopleResult[];
  counter: number;
}

export default function Cards(props: CardsProps) {
  const data = props.respData;

  const cardsList = data.map((item, index) => {
    if (index < props.counter) {
      return (
        <Card
          onHandleCardClick={props.onHandleCardClick}
          cardData={item}
          key={index}
          counter={props.counter}
        />
      );
    }
  });

  return <div className="cards">{cardsList}</div>;
}
