import React from 'react';

class Cards extends React.Component {
  render() {
    return (
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="name">
          <h3>{'Luke Skywalker'}</h3>
        </div>
        <div className="description">
          <p>gender: {'male'}</p>
          <p>height: {'172'}</p>
          <p>birthday: {'"19BBY"'}</p>
          <p>eye color: {'blue'}</p>
          <p>hair color: {'blond'}</p>
          <p>weight: {'77'}</p>
          <p>eye color: {'blue'}</p>
        </div>
      </div>
    );
  }
}

export default Cards;
