import React from 'react';
import { PeopleResult } from '../../types/types';
import Cards from '../cards/Cards';
import Input from '../input/Input';
import PeopleServise from '../api/people';
import Button from '../button/Button';
import './page.css';

interface PageProps {}

interface PageState {
  people: PeopleResult[];
  isLoading: boolean;
}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.state = { people: [], isLoading: false };
  }

  async getPeopleForName(name: string) {
    try {
      this.setState({ isLoading: true });
      const { results } = await PeopleServise.getPeopleByName(name);
      this.setState({ isLoading: false });
      this.setState({ people: results });
    } catch (error) {
      this.setState({ isLoading: false });
      console.error(error as Error);
    }
  }

  async getPeoples() {
    try {
      this.setState({ isLoading: true });
      const { results } = await PeopleServise.getAllPeople();
      this.setState({ isLoading: false });
      this.setState({ people: results });
    } catch (error) {
      this.setState({ isLoading: false });
      console.error(error as Error);
    }
  }

  handleInputSubmit(inputValue: string) {
    if (inputValue === '') {
      this.getPeoples();
    } else {
      this.getPeopleForName(inputValue);
    }
    localStorage.setItem('inputValue', inputValue);
  }

  render() {
    return (
      <div className="page">
        <Button />
        <Input onInputSubmit={this.handleInputSubmit} />
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <Cards respData={this.state.people} />
        )}
      </div>
    );
  }
}

export default Page;
