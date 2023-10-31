import React from 'react';
import './input.css';
interface InputProps {
  onInputSubmit: (value: string) => void;
}

interface InputState {
  value: string;
}

class Input extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    const valueLs = localStorage.getItem('inputValue');
    valueLs !== null
      ? (this.state = { value: valueLs })
      : (this.state = { value: '' });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    this.props.onInputSubmit(this.state.value);
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
      <form className="form" onSubmit={this.handleSubmit}>
        <label>Find</label>
        <input
          className="finder"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input className="submit-button" type="submit" value="Find" />
      </form>
    );
  }
}

export default Input;
