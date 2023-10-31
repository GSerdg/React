import React from 'react';
import { PeopleResult } from '../../types/types';
import Card from '../card/Card';
import './cards.css';

interface CardsProps {
  respData: PeopleResult[];
}

interface CardsState {}

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    const data = this.props.respData;

    const cardsList = data.map((item, index) => (
      <Card cardData={item} key={index} />
    ));

    return <div className="cards">{cardsList}</div>;
  }
}

export default Cards;
