import React from 'react';
import { PeopleResult } from '../types/types';
import Cards from './Cards';
import Finder from './Finder';
import ResponseServise from './api/responses';

interface PageProps {}

interface PageState {
  inputValue: string;
  respData: PeopleResult[];
}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.state = { inputValue: '', respData: [] };
  }

  async getPeopleForName(name: string) {
    const { results } = await ResponseServise.getForName(name);
    this.setState({ respData: results });
  }

  async getPeoples() {
    const { results } = await ResponseServise.getAll();
    this.setState({ respData: results });
  }

  handleInputSubmit(inputValue: string) {
    if (inputValue === '') {
      this.getPeoples();
    } else {
      this.getPeopleForName(inputValue);
    }
  }

  render() {
    const data = this.state.respData;

    return (
      <div className="page">
        <Finder onInputSubmit={this.handleInputSubmit} />
        <Cards respData={data} />
      </div>
    );
  }
}

export default Page;
