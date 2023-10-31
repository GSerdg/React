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
    let nameClass = 'finder';
    let submitClass = 'submit-button';
    let submitDisable = false;
    if (this.state.value.length !== this.state.value.trim().length) {
      nameClass = 'finder finder_color';
      submitClass = 'submit-button submit-button_disable';
      submitDisable = true;
    }

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>Find</label>
        <input
          className={nameClass}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input
          className={submitClass}
          type="submit"
          value="Find"
          disabled={submitDisable}
        />
      </form>
    );
  }
}

export default Input;
