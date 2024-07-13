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
    // Log error to console
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  handleThrowError = () => {
    throw new Error('This is a test error thrown from ErrorBoundary.');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return (
      <div className="error-boundary">
        <button className="btn" onClick={this.handleThrowError}>
          Check Error Boundary
        </button>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
