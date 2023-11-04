import React from 'react';
import './input.css';

interface InputProps {
  onInputSubmit: (page: number, inputValue: string) => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
  pageNumber: number;
  isLoading: boolean;
}

export default function Input(props: InputProps) {
  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;

  const page = 1;

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    props.onInputChange(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    props.onInputSubmit(page, props.inputValue);
  }

  if (props.inputValue.length !== props.inputValue.trim().length) {
    nameClass = 'finder finder_color';
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  if (props.isLoading) {
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
