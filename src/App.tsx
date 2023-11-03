import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/error/Error-boundary';
import { router } from './components/router/router';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>React APP</h1>
        {router()}
      </div>
    </ErrorBoundary>
  );
}

function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default WrappedApp;
