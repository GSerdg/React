import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Card from '../card/Card';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetAllPeopleQuery } from '../api/people';
import CardsCountInput from '../cards-count-input/CardsCountInput';
import CardsPagination from '../cards-pagination/CardsPagination';
import navigateToPage from '../../shared/navigate';
import NotFound from '../../pages/not-found/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setIsFetchingCards } from '../../app/apiSlice';
import { setInputValue } from '../../app/inputSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import './cards.css';

export default function Cards() {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const cardsPerPage = useSelector(
    (state: RootState) => state.cards.cardsPerPageValue
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>();
  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [fetchParams, setFetchParams] = useState<string>();

  const navigate = useNavigate();
  const { page: pageParams } = useParams();

  const { data, isFetching } = useGetAllPeopleQuery(fetchParams ?? skipToken);

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

      setCurrentPage(pageNumber);
      dispatch(setInputValue(searchValue));
      setFetchParams(pageParams);
    }

    pageParams
      ? getValuesFromParams(pageParams)
      : navigateToPage(navigate, inputValue, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  const cardsList = data?.results.map((item, index) => {
    if (index < cardsPerPage) {
      return <Card cardData={item} key={item.url} />;
    }
  });

  return (
    <div className="view-cards">
      <div
        className="cards__container"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const target = event.target as HTMLElement;
          if (
            target.classList[0] === 'view-cards__list' ||
            target.classList[0] === 'cards'
          ) {
            currentPage && navigateToPage(navigate, inputValue, currentPage);
          }
        }}
      >
        <CardsCountInput />
        <div className="view-cards__list">
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <div className="cards">
              {cardsList && cardsList.length !== 0 ? cardsList : <NotFound />}
            </div>
          )}
          <CardsPagination
            currentPage={currentPage}
            isNextPage={isNextPage}
            isPrevPage={isPrevPage}
          />
        </div>
      </div>
      <Outlet
        context={{
          currentPage,
        }}
      />
    </div>
  );
}
