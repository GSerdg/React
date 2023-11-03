import React from 'react';
import './input.css';

interface InputProps {
  onInputSubmit: (inputValue: string, page: number) => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
  pageNumber: number;
}

export default function Input(props: InputProps) {
  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;

  const page = 1;

  /* useEffect(() => {
    props.onInputSubmit(props.inputValue, props.pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    props.onInputChange(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    props.onInputSubmit(props.inputValue, page);
  }

  if (props.inputValue.length !== props.inputValue.trim().length) {
    nameClass = 'finder finder_color';
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Find</label>
      <input
        className={nameClass}
        type="text"
        value={props.inputValue}
        onChange={handleChange}
      />
      <input
        className={submitClass}
        type="submit"
        value="Find"
        disabled={submitDisable}
      />
    </form>
  );
}
