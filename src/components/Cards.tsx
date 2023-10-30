import React from 'react';
import { PeopleResult } from '../types/types';

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
    return (
      <div className="card">
        <div className="name">
          <h3>{this.props.cardData.name}</h3>
        </div>
        <div className="description">
          <p>gender: {this.props.cardData.gender}</p>
          <p>height: {this.props.cardData.height}</p>
          <p>birthday: {this.props.cardData.birth_year}</p>
          <p>eye color: {this.props.cardData.eye_color}</p>
          <p>hair color: {this.props.cardData.hair_color}</p>
          <p>weight: {this.props.cardData.mass}</p>
          <p>hair color: {this.props.cardData.hair_color}</p>
          <p>skin color: {this.props.cardData.skin_color}</p>
        </div>
      </div>
    );
  }
}

export default Cards;
