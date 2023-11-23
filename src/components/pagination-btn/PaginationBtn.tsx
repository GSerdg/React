import { MouseEventHandler } from 'react';

interface PaginationBtn {
  onHandleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled: boolean;
  testid: string;
  title: string;
}

export default function PaginationBtn(props: PaginationBtn) {
  return (
    <button
      data-testid={props.testid}
      className="pagination__btn"
      onClick={props.onHandleClick}
      disabled={props.isDisabled}
    >
      {props.title}
    </button>
  );
}
