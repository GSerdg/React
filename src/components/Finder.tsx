import React from 'react';

interface FinderProps {
  onInputSubmit: (value: string) => void;
}

interface FinderState {
  value: string;
}

class Finder extends React.Component<FinderProps, FinderState> {
  constructor(props: FinderProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    this.setState({ value: target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.props.onInputSubmit(this.state.value);
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
