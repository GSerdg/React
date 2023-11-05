import { useOutletContext, useParams } from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Button from '../button/Button';
import Card from '../card/Card';
import './cardDetails.css';
import { useEffect } from 'react';

interface CardDetailsContext {
  onHandleClick: () => void;
  getCard: (link: string) => Promise<void>;
  respData: PeopleResult | undefined;
  isLoading: boolean;
  link: string;
}

export default function CardDetails() {
  const context = useOutletContext<CardDetailsContext>();
  let cardComponent = null;
  const { card } = useParams();
  let link = context.link;
  if (card) {
    link = link.replace(/\d+/, card);
  }

  useEffect(() => {
    context.getCard(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  if (context.respData) {
    cardComponent = (
      <Card cardData={context.respData} isDetails={true} className="card" />
    );
  }
  return (
    <div className="card-details">
      <Button onHandleClick={context.onHandleClick} title={'Closed'} />
      {context.isLoading ? <div>Loading...</div> : cardComponent}
    </div>
  );
}
