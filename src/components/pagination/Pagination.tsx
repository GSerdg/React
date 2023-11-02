interface PaginationProps {
  onGetNewPage: (value: string, page: number) => void;
  isNextPage: boolean;
  isPrevPage: boolean;
  inputValue: string;
  pageNumber: number;
}

export default function Pagination(props: PaginationProps) {
  function handleClick(event: React.FormEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    let newPage = props.pageNumber;

    if (target.id === 'prev') {
      newPage = props.pageNumber - 1;
    }

    if (target.id === 'next') {
      newPage = props.pageNumber + 1;
    }

    props.onGetNewPage(props.inputValue, newPage);
  }

  return (
    <div className="pagination">
      <button
        id="prev"
        className="pagination__btn"
        onClick={handleClick}
        disabled={!props.isPrevPage}
      >
        {'<<'}
      </button>
      <span className="pfgination__page">{props.pageNumber}</span>
      <button
        id="next"
        className="pagination__btn"
        onClick={handleClick}
        disabled={!props.isNextPage}
      >
        {'>>'}
      </button>
    </div>
  );
}
