import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  currentPage: number;
}

export default function CardsPagination(props: PaginationProps) {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const navigate = useNavigate();

  function handleClickPrev() {
    const newPage = props.currentPage - 1;

    navigateToPage(navigate, inputValue, newPage);
  }

  function handleClickNext() {
    const newPage = props.currentPage + 1;

    navigateToPage(navigate, inputValue, newPage);
  }

  return (
    !props.isLoading && (
      <div className="pagination">
        <PaginationBtn
          id={'prev'}
          onHandleClick={handleClickPrev}
          isDisabled={!props.isPrevPage}
          title={'<<'}
        />
        <span className="pagination__page">{props.currentPage}</span>
        <PaginationBtn
          id={'next'}
          onHandleClick={handleClickNext}
          isDisabled={!props.isNextPage}
          title={'>>'}
        />
      </div>
    )
  );
}
