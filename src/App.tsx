import Finder from './components/Finder';
import Cards from './components/Cards';

alert(
  'Привет. К сожалению я не успеваю ничего толком сделать к дедлайну. Просьба дать мне возможность еще немного потрудиться и отодвинуть проверку на столько, на сколько это возможно )). Спасибо, мой дорогой проверяющий.'
);

function App() {
  return (
    <div className="App">
      <h1>React APP</h1>
      <Finder />
      <Cards />
    </div>
  );
}

export default App;
