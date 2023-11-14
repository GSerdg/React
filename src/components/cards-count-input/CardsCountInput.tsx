import { useState } from 'react';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import navigateToPage from '../../shared/navigate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCardsPerPage } from '../../app/cardsPerPageSlice';

export default function CardsCountInput() {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const cardsPerPage = useSelector(
    (state: RootState) => state.cardsPerPage.cardsPerPageValue
  );
  const dispatch = useDispatch();
  const [isPrevEnabled, setIsPrev] = useState(true);
  const [isNextEnabled, setIsNext] = useState(false);
  const [cardCount, setCardCount] = useState(cardsPerPage);

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
          dispatch(setCardsPerPage(cardCount));
          navigateToPage(navigate, inputValue, 1);
        }}
      />
    </div>
  );
}
