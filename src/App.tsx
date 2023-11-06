import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/error/Error-boundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>React APP</h1>
        <Outlet />
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
