import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import navigateToPage from '../../shared/navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useGetAllPeopleQuery } from '../api/people';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  currentPage: number;
}

export default function CardsPagination(props: PaginationProps) {
  const { isFetching } = useGetAllPeopleQuery(props.currentPage);

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
