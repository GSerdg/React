import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/error/Error-boundary';
import Home from './pages/home/Home';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>React APP</h1>
        <Home />
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
