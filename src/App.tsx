import ErrorBoundary from './components/error/ErrorBoundary';
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

export default App;
