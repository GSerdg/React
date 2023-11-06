import ErrorBoundary from './components/error/Error-boundary';
import './index.css';
import Home from './pages/home/Home';

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

/* function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
} */

export default App;
