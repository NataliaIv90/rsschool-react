import { Component } from 'react';
import './App.css';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <div>App</div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
