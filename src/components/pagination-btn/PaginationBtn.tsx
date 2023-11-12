import { MouseEventHandler } from 'react';
import './PaginationBtn.css';

interface PaginationBtn {
  onHandleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled: boolean;
  id: string;
  title: string;
}

export default function PaginationBtn(props: PaginationBtn) {
  return (
    <button
      data-testid={props.id}
      id={props.id}
      className="pagination__btn"
      onClick={props.onHandleClick}
      disabled={props.isDisabled}
    >
      {props.title}
    </button>
  );
}
