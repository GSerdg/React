import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  currentPage: number | undefined;
}

export default function CardsPagination(props: PaginationProps) {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const isFetching = useSelector(
    (state: RootState) => state.api.isFetchingCards
  );

  const navigate = useNavigate();

  function handleClickPrev() {
    if (props.currentPage) {
      const newPage = props.currentPage - 1;

      navigateToPage(navigate, inputValue, newPage);
    }
  }

  function handleClickNext() {
    if (props.currentPage) {
      const newPage = props.currentPage + 1;

      navigateToPage(navigate, inputValue, newPage);
    }
  }

  return (
    !isFetching && (
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
