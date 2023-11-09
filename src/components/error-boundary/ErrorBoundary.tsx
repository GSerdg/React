import { Component } from 'react';
import './ErrorBoundary.css';

interface ErrorProps {
  children: JSX.Element;
}
interface ErrorState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true };
  }
  static componentDidCatch(error: Error) {
    console.error(error);
  }
  render() {
    return this.state.hasError ? (
      <h1 className="error-header">Ohh Error!!!</h1>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
