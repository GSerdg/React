import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/PaginationBtn';
import navigateToPage from '../../shared/navigate';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  currentPage: number;
}

export default function CardsPagination(props: PaginationProps) {
  const navigate = useNavigate();

  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;

    let newPage = props.currentPage;

    if (target.id === 'prev') {
      newPage = props.currentPage - 1;
    }

    if (target.id === 'next') {
      newPage = props.currentPage + 1;
    }

    navigateToPage(navigate, newPage);
  }

  return (
    !props.isLoading && (
      <div className="pagination">
        <PaginationBtn
          id={'prev'}
          onHandleClick={handleClick}
          isDisabled={props.isPrevPage}
          title={'<<'}
        />
        <span className="pagination__page">{props.currentPage}</span>
        <PaginationBtn
          id={'next'}
          onHandleClick={handleClick}
          isDisabled={props.isNextPage}
          title={'>>'}
        />
      </div>
    )
  );
}
