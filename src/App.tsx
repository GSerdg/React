import { HashRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/error/Error-boundary';
import Home from './pages/home/Home';
import './index.css';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>React APP</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
