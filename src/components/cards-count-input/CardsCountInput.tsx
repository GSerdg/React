import { useState } from 'react';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import Button from '../button/Button';
import navigateToPage from '../../shared/navigate';
import { useDispatch } from 'react-redux';
import { setCardsPerPage } from '../../store/cardsSlice';
import { useSelector } from '../../shared/useSelector';
import { useRouter } from 'next/router';

export default function CardsCountInput() {
  const inputValue = useSelector((state) => state.input.inputValue);
  const cardsPerPage = useSelector((state) => state.cards.cardsPerPageValue);
  const isFetchingCards = useSelector((state) => state.api.isFetchingCards);
  const isFetchingDetailed = useSelector(
    (state) => state.api.isFetchingDetailed
  );

  const dispatch = useDispatch();
  const [isPrevEnabled, setIsPrev] = useState(true);
  const [isNextEnabled, setIsNext] = useState(false);
  const [cardCount, setCardCount] = useState(cardsPerPage);

  const router = useRouter();

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

  function handleClickSet() {
    dispatch(setCardsPerPage(cardCount));
    navigateToPage(router, inputValue, 1);
  }

  return (
    <div className="pagination">
      <span>Choose number items on page</span>
      <PaginationBtn
        testid={'prev'}
        onHandleClick={handleClickPrev}
        isDisabled={!isPrevEnabled}
        title={'-'}
      />
      <span className="pagination__page">{cardCount}</span>
      <PaginationBtn
        testid={'next'}
        onHandleClick={handleClickNext}
        isDisabled={!isNextEnabled}
        title={'+'}
      />
      <Button
        title={'Set'}
        onHandleClick={handleClickSet}
        isDisabled={isFetchingCards || isFetchingDetailed}
      />
    </div>
  );
}
