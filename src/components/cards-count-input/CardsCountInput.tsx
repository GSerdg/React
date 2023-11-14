import { useState } from 'react';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface CardsOnPageProps {
  onButtonChange: (newCounter: number) => void;
  counter: number;
}

export default function CardsCountInput(props: CardsOnPageProps) {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const [isPrevEnabled, setIsPrev] = useState(true);
  const [isNextEnabled, setIsNext] = useState(false);
  const [cardCount, setCardCount] = useState(props.counter);

  const navigate = useNavigate();
  function setPaginationActivity(value: number) {
    value === 10 ? setIsNext(false) : setIsNext(true);
    value === 1 ? setIsPrev(false) : setIsPrev(true);
  }

  function handleClickPrev() {
    const newCounter = cardCount - 1;

    setPaginationActivity(newCounter);
    setCardCount(newCounter);
  }

  function handleClickNext() {
    const newCounter = cardCount + 1;

    setPaginationActivity(newCounter);
    setCardCount(newCounter);
  }

  return (
    <div className="pagination">
      <span>Choose number items on page</span>
      <PaginationBtn
        id={'prev'}
        onHandleClick={handleClickPrev}
        isDisabled={!isPrevEnabled}
        title={'-'}
      />
      <span className="pagination__page">{cardCount}</span>
      <PaginationBtn
        id={'next'}
        onHandleClick={handleClickNext}
        isDisabled={!isNextEnabled}
        title={'+'}
      />
      <Button
        title={'Set'}
        onHandleClick={() => {
          props.onButtonChange(cardCount);
          navigateToPage(navigate, inputValue, 1);
        }}
      />
    </div>
  );
}
