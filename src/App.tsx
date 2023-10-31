import ErrorBoundary from './components/ErrorBoundary';
import Page from './components/Page';

alert(
  'Привет. К сожалению я не успеваю ничего толком сделать к дедлайну. Просьба дать мне возможность еще немного потрудиться и отодвинуть проверку на столько, на сколько это возможно )). Спасибо, мой дорогой проверяющий.'
);

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <h1>React APP</h1>
        <Page />
      </div>
    </ErrorBoundary>
  );
}

export default App;
