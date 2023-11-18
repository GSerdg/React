import './button.css';

interface ButtonProps {
  onHandleClick: () => void;
  title: string;
  isDisabled?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onHandleClick}
      className={`button ${props.className || ''}`}
      disabled={props.isDisabled || false}
    >
      {props.title}
    </button>
  );
}
