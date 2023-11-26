import * as React from 'react';
import { useRouter } from 'next/router';
import { useGetAllPeopleQuery } from '@/components/api/people';
import navigateToPage from '@/shared/navigate';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from '@/shared/useSelector';
import CardsCountInput from '@/components/cards-count-input/CardsCountInput';
import CardsPostDetails from '@/components/post-details/CardsPostDetails';
import CardsPagination from '@/components/cards-pagination/CardsPagination';

export default function Cards() {
  const inputValue = useSelector((state) => state.input.inputValue);
  const currentPage = useSelector((state) => state.cards.currentPage);

  const router = useRouter();
  const searchParams = router.query.searchParams;
  const { data } = useGetAllPeopleQuery(
    typeof searchParams === 'string' ? searchParams : skipToken
  );

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
          isNextPage={data?.next === null ? false : true}
          isPrevPage={data?.previous === null ? false : true}
        />
      </div>
    </div>
  );
}
