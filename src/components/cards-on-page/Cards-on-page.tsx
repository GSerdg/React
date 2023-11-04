import { useState } from 'react';
import PaginationBtn from '../pagination-btn/Pagination-btn';

interface CardsOnPageProps {
  onButtonChange: (newCounter: number) => void;
  counter: number;

  /* onGetNewPage: (value: string, page: number) => void;
  handleShowCards: (page: number, search?: string) => void;
  isLoading: boolean;
  inputValue: string;
  pageNumber: number; */
}

export default function CardsOnPage(props: CardsOnPageProps) {
  const [isPrev, setIsPrev] = useState(true);
  const [isNext, setIsNext] = useState(false);

  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    let newCounter = props.counter;

    if (target.id === 'prev') {
      newCounter = props.counter - 1;
    }

    if (target.id === 'next') {
      newCounter = props.counter + 1;
    }
    newCounter === 10 ? setIsNext(false) : setIsNext(true);
    newCounter === 1 ? setIsPrev(false) : setIsPrev(true);

    props.onButtonChange(newCounter);
  }

  return (
    <div className="pagination">
      <span>Choose number items on page</span>
      <PaginationBtn
        id={'prev'}
        onHandleClick={handleClick}
        isDisabled={isPrev}
        title={'<<'}
      />
      <span className="pagination__page">{props.counter}</span>
      <PaginationBtn
        id={'next'}
        onHandleClick={handleClick}
        isDisabled={isNext}
        title={'>>'}
      />
    </div>
  );
}
