import React, { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleThrowError = () => {
    (async () => {
      throw new Error('This is a test error thrown from ErrorBoundary.');
    })().catch((error) => {
      this.setState({
        hasError: true,
        error: error,
      });
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          {this.state.error && this.state.error.toString()}
          {this.state.errorInfo && this.state.errorInfo.componentStack}
          <a href="/">
            <button className="btn">Go to the home page</button>
          </a>
        </div>
      );
    }

    return (
      <div className="error-boundary">
        <button
          className="btn error-boundary-btn"
          onClick={this.handleThrowError}
        >
          Check Error Boundary
        </button>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
