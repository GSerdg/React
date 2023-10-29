import React from 'react';
import ResponseServise from './api/responses';
import { PeopleResult } from '../types/types';

class Finder extends React.Component<
  unknown,
  {
    value: string;
    respData: PeopleResult[];
  }
> {
  constructor(props: string) {
    super(props);
    this.state = { value: '', respData: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getPeopleForName(name: string) {
    const { results } = await ResponseServise.getForName(name);
    this.setState({ respData: results });
    console.log('res', results);
  }

  async getPeoples() {
    const { results } = await ResponseServise.getAll();
    console.log(results);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    this.setState({ value: target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.value === '') {
      this.getPeoples();
    } else {
      this.getPeopleForName(this.state.value);
    }
    console.log(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Find
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Find" />
      </form>
    );
  }
}

export default Finder;
