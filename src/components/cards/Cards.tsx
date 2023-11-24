import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetAllPeopleQuery } from '@/components/api/people';
import navigateToPage from '@/shared/navigate';
import { useDispatch } from 'react-redux';
import { setIsFetchingCards } from '@/store/apiSlice';
import { setInputValue } from '@/store/inputSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from '@/shared/useSelector';
import { useRouter } from 'next/router';
import CardsCountInput from '@/components/cards-count-input/CardsCountInput';
import CardsPostDetails from '@/components/post-details/CardsPostDetails';
import CardsPagination from '@/components/cards-pagination/CardsPagination';
import { setCurrentPage } from '@/store/cardsSlice';

export default function Cards() {
  const inputValue = useSelector((state) => state.input.inputValue);
  const currentPage = useSelector((state) => state.cards.currentPage);
  const dispatch = useDispatch();

  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);

  const router = useRouter();
  const searchParams = router.query.searchParams;

  const { data, isFetching } = useGetAllPeopleQuery(
    typeof searchParams === 'string' ? searchParams : skipToken
  );

  useEffect(() => {
    dispatch(setIsFetchingCards(isFetching));
  });

  useEffect(() => {
    setIsNextPage(data?.next === null ? false : true);
    setIsPrevPage(data?.previous === null ? false : true);
  }, [data]);

  useEffect(() => {
    function getValuesFromParams(params: string) {
      const pageParamsArray = params.split('&').map((item) => item.split('='));
      const searchValue =
        pageParamsArray.length === 2 ? pageParamsArray[0][1] : '';
      const pageNumber =
        pageParamsArray.length === 2
          ? +pageParamsArray[1][1]
          : +pageParamsArray[0][1];

      dispatch(setCurrentPage(pageNumber));
      dispatch(setInputValue(searchValue));
    }
    searchParams && typeof searchParams === 'string'
      ? getValuesFromParams(searchParams)
      : navigateToPage(router, inputValue, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div
      className="cards__container"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLElement;
        if (
          target.classList[0] === 'view-cards__list' ||
          target.classList[0] === 'cards'
        ) {
          currentPage && navigateToPage(router, inputValue, currentPage);
        }
      }}
    >
      <CardsCountInput />
      <div className="view-cards__list">
        <div className="cards">
          {
            <CardsPostDetails
              fetchParams={
                typeof searchParams === 'string' ? searchParams : undefined
              }
            />
          }
        </div>
        <CardsPagination
          currentPage={currentPage}
          isNextPage={isNextPage}
          isPrevPage={isPrevPage}
        />
      </div>
    </div>
  );
}
