import React, { useEffect, useState } from 'react';
import './input.css';

interface InputProps {
  onInputSubmit: (value: string) => void;
}

export default function Input(props: InputProps) {
  const valueLs = localStorage.getItem('inputValue');
  let state: string;
  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;

  valueLs !== null ? (state = valueLs) : (state = '');

  const [value, SetValue] = useState(state);

  useEffect(() => {
    props.onInputSubmit(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    SetValue(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    props.onInputSubmit(value);
  }

  if (value.length !== value.trim().length) {
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
        value={value}
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
