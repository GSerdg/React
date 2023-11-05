import './button.css';

interface ButtonProps {
  onHandleClick: () => void;
  title: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onHandleClick} className="button">
      {props.title}
    </button>
  );
}
