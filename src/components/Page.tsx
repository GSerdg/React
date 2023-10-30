import React from 'react';
import { PeopleResult } from '../types/types';
import Cards from './Cards';
import Input from './Input';
import ResponseServise from './api/responses';
import { BallTriangle } from 'react-loader-spinner';

interface PageProps {}

interface PageState {
  respData: PeopleResult[];
  spinner: boolean;
}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.state = { respData: [], spinner: false };
  }

  async getPeopleForName(name: string) {
    this.setState({ spinner: true });
    const { results } = await ResponseServise.getForName(name);
    this.setState({ spinner: false });
    this.setState({ respData: results });
  }

  async getPeoples() {
    this.setState({ spinner: true });
    const { results } = await ResponseServise.getAll();
    this.setState({ spinner: false });
    this.setState({ respData: results });
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
    const data = this.state.respData;
    let cards: JSX.Element | null = null;
    if (!this.state.spinner) {
      cards = <Cards respData={data} />;
    }
    return (
      <div className="page">
        <Input onInputSubmit={this.handleInputSubmit} />
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={this.state.spinner}
        />
        {cards}
      </div>
    );
  }
}

export default Page;
