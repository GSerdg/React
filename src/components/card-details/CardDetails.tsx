import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import Card from '../card/Card';
import './cardDetails.css';

interface CardDetailsProps {
  onHandleClick: () => void;
  respData: PeopleResult | undefined;
  isLoading: boolean;
}

export default function CardDetails(props: CardDetailsProps) {
  let cardComponent = null;
  if (props.respData) {
    cardComponent = <Card cardData={props.respData} isDetails={true} />;
  }
  return (
    <div className="card-details">
      {props.isLoading ? <div>Loading...</div> : cardComponent}
      <Button onHandleClick={props.onHandleClick} title={'Closed'} />
    </div>
  );
}
