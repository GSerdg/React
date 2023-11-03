import { MouseEventHandler } from 'react';

interface PaginationBtn {
  handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled: boolean;
  isPrevPage: boolean;
  id: string;
  title: string;
}

export default function PaginationBtn(props: PaginationBtn) {
  return (
    <button
      id={props.id}
      className="pagination__btn"
      onClick={props.handleClick}
      disabled={!props.isDisabled}
    >
      {props.title}
    </button>
  );
}
