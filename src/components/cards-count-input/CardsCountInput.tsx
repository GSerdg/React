import { useState } from 'react';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import navigateToPage from '../../shared/navigate';

interface CardsOnPageProps {
  onButtonChange: (newCounter: number) => void;
  counter: number;
}

export default function CardsCountInput(props: CardsOnPageProps) {
  const [isPrevEnabled, setIsPrev] = useState(true);
  const [isNextEnabled, setIsNext] = useState(false);
  const [counter, setCounter] = useState(props.counter);

  const navigate = useNavigate();

  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    let newCounter = props.counter;

    if (target.id === 'prev') {
      newCounter = counter - 1;
    }

    if (target.id === 'next') {
      newCounter = counter + 1;
    }
    newCounter === 10 ? setIsNext(false) : setIsNext(true);
    newCounter === 1 ? setIsPrev(false) : setIsPrev(true);
    setCounter(newCounter);
  }

  return (
    <div className="pagination">
      <span>Choose number items on page</span>
      <PaginationBtn
        id={'prev'}
        onHandleClick={handleClick}
        isDisabled={isPrevEnabled}
        title={'-'}
      />
      <span className="pagination__page">{counter}</span>
      <PaginationBtn
        id={'next'}
        onHandleClick={handleClick}
        isDisabled={isNextEnabled}
        title={'+'}
      />
      <Button
        title={'Set'}
        onHandleClick={() => {
          props.onButtonChange(counter);
          navigateToPage(navigate, 1);
        }}
      />
    </div>
  );
}
