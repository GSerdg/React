import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import navigateToPage from '../../shared/navigate';
import { useContext } from 'react';
import { InputContext } from '../../pages/home/Home';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  currentPage: number;
}

export default function CardsPagination(props: PaginationProps) {
  const inputContext = useContext(InputContext);

  const navigate = useNavigate();

  function handleClickPrev() {
    const newPage = props.currentPage - 1;

    navigateToPage(navigate, inputContext?.inputValue, newPage);
  }

  function handleClickNext() {
    const newPage = props.currentPage + 1;

    navigateToPage(navigate, inputContext?.inputValue, newPage);
  }

  return (
    !props.isLoading && (
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
