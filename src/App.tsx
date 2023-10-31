import ErrorBoundary from './components/error/Error-boundary';
import Page from './components/page/Page';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>React APP</h1>
        <Page />
      </div>
    </ErrorBoundary>
  );
}

export default App;
