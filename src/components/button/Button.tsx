import cl from 'classnames';

interface ButtonProps {
  onHandleClick: () => void;
  title: string;
  isDisabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onHandleClick}
      className={cl('button', { ['button_disabled']: props.isDisabled })}
      disabled={props.isDisabled}
    >
      {props.title}
    </button>
  );
}
