import PaginationBtn from '@/components/pagination-btn/PaginationBtn';
import navigateToPage from '@/shared/navigate';
import { useSelector } from '@/shared/useSelector';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';
import { useGetAllPeopleQuery } from '@/components/api/people';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  currentPage: number | undefined;
}

export default function CardsPagination(props: PaginationProps) {
  const inputValue = useSelector((state) => state.input.inputValue);

  const router = useRouter();
  const searchParams = router.query.searchParams;

  const isFetchingCards = useGetAllPeopleQuery(
    (searchParams as string) ?? skipToken
  ).isFetching;

  function handleClickPrev() {
    if (props.currentPage) {
      const newPage = props.currentPage - 1;

      navigateToPage(router, inputValue, newPage);
    }
  }

  function handleClickNext() {
    if (props.currentPage) {
      const newPage = props.currentPage + 1;

      navigateToPage(router, inputValue, newPage);
    }
  }

  return (
    !isFetchingCards && (
      <div className="pagination">
        <PaginationBtn
          testid={'prev'}
          onHandleClick={handleClickPrev}
          isDisabled={!props.isPrevPage}
          title={'<<'}
        />
        <span className="pagination__page">{props.currentPage}</span>
        <PaginationBtn
          testid={'next'}
          onHandleClick={handleClickNext}
          isDisabled={!props.isNextPage}
          title={'>>'}
        />
      </div>
    )
  );
}
