import { useNavigate } from 'react-router-dom';
import PaginationBtn from '../pagination-btn/Pagination-btn';
import navigateToPage from '../../shared/navigate';

interface PaginationProps {
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  pageNumber: number;
}

export default function CardsPagination(props: PaginationProps) {
  const navigate = useNavigate();

  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;

    let newPage = props.pageNumber;

    if (target.id === 'prev') {
      newPage = props.pageNumber - 1;
    }

    if (target.id === 'next') {
      newPage = props.pageNumber + 1;
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
        <span className="pagination__page">{props.pageNumber}</span>
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
