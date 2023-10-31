import { Component } from 'react';

interface ButtonProps {}
interface ButtonState {
  error: boolean;
}

export default class Button extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);

    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      throw new Error('You generate some error');
    }
    return (
      <button onClick={this.handleClick} className="button">
        Error
      </button>
    );
  }
}
