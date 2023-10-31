import React from 'react';
import { PeopleResult } from '../../types/types';
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

interface CardProps {
  cardData: PeopleResult;
}

interface CardState {}

class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    const dataTitle = [
      'gender',
      'height',
      'birthday',
      'eye color',
      'hair color',
      'mass',
      'skin color',
    ];
    const elements = dataTitle.map((item, index) => {
      const propsName = item.split(' ').join('_') as keyof PeopleResult;
      return (
        <p className="description__title" key={index}>
          {item}: {this.props.cardData[propsName]}
        </p>
      );
    });

    return (
      <div className="card">
        <div className="name">
          <h3 className="name__title">{this.props.cardData.name}</h3>
        </div>
        <div className="description">{elements}</div>
      </div>
    );
  }
}

export default Cards;
