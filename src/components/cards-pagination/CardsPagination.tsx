import PaginationBtn from '@/components/pagination-btn/PaginationBtn';
import navigateToPage from '@/shared/navigate';
import { useSelector } from '@/shared/useSelector';
import { useRouter } from 'next/router';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  currentPage: number | undefined;
}

export default function CardsPagination(props: PaginationProps) {
  const inputValue = useSelector((state) => state.input.inputValue);
  const isFetchingCards = useSelector((state) => state.api.isFetchingCards);

  const router = useRouter();

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
