import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputContext } from '../../pages/home/Home';
import './Input.css';

interface InputProps {
  searchInput: boolean;
}

export default function Input(props: InputProps) {
  const inputContext = useContext(InputContext);
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

      inputContext.setInputValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    inputContext.setInputValue(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inputContext.inputValue
      ? navigate(`/search=${inputContext.inputValue}&page=${pageNumber}`)
      : navigate(`/page=${pageNumber}`);
    localStorage.setItem('inputValue', inputContext.inputValue);
  }

  if (
    inputContext.inputValue.length !== inputContext.inputValue.trim().length
  ) {
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
        data-testid={'inputField'}
        className={nameClass}
        type="text"
        value={inputContext.inputValue}
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
