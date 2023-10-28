import React from 'react';
import ResponseServise from './api/responses';

class Finder extends React.Component {
  render() {
    return (
      <div className="finder">
        <input type="text" name="Find" id="find" />
        <button type="submit">Find</button>
      </div>
    );
  }
}

async function getPeoples() {
  const { results } = await ResponseServise.getAll();
  console.log(results);
}

async function getPeopleForName() {
  const { results } = await ResponseServise.getForName('Skywalker');
  console.log(results);
}

getPeoples();
getPeopleForName();

export default Finder;
