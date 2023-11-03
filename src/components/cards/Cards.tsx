import { useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Card from '../card/Card';
import './cards.css';

interface CardsProps {
  respData: PeopleResult[];
}

export default function Cards(props: CardsProps) {
  const data = props.respData;

  const cardsList = data.map((item, index) => (
    <Card cardData={item} key={index} />
  ));
  const { page } = useParams();
  console.log(page);

  return <div className="cards">{cardsList}</div>;
}
