import PaginationBtn from '../pagination-btn/Pagination-btn';

interface PaginationProps {
  onGetNewPage: (value: string, page: number) => void;
  handleShowCards: (page: number, search?: string) => void;
  isNextPage: boolean;
  isPrevPage: boolean;
  isLoading: boolean;
  inputValue: string;
  pageNumber: number;
}

export default function CardsPagination(props: PaginationProps) {
  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    let newPage = props.pageNumber;

    if (target.id === 'prev') {
      newPage = props.pageNumber - 1;
    }

    if (target.id === 'next') {
      newPage = props.pageNumber + 1;
    }

    props.handleShowCards(newPage, props.inputValue);
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
