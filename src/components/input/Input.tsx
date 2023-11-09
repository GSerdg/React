import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../main';
import './Input.css';

interface InputProps {
  searchInput: boolean;
}

export default function Input(props: InputProps) {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || ''
  );
  const navigate = useNavigate();

  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;
  const pageNumber = 1;

  const { page } = useParams();

  useEffect(() => {
    if (page) {
      const pageParams = page.split('&').map((item) => item.split('='));
      const value = pageParams.length === 2 ? pageParams[0][1] : '';

      setInputValue(value);
    }
  }, [page]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    setInputValue(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inputValue
      ? navigate(`${PATHS.HOME}search=${inputValue}&page=${pageNumber}`)
      : navigate(`${PATHS.HOME}page=${pageNumber}`);
    localStorage.setItem('inputValue', inputValue);
  }

  if (inputValue.length !== inputValue.trim().length) {
    nameClass = 'finder finder_color';
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  if (props.searchInput) {
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Find</label>
      <input
        className={nameClass}
        type="text"
        value={inputValue}
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
