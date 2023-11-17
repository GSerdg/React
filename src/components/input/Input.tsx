import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './Inputs.css';

export default function Input() {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const isFetching = useSelector(
    (state: RootState) => state.api.isFetchingCards
  );
  const navigate = useNavigate();

  const [valueState, setValueState] = useState(inputValue);

  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;
  const pageNumber = 1;

  const { page } = useParams();

  useEffect(() => {
    if (page) {
      const pageParams = page.split('&').map((item) => item.split('='));
      const value = pageParams.length === 2 ? pageParams[0][1] : '';

      setValueState(value);
      localStorage.setItem('inputValue', value);
    }
  }, [page]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setValueState(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    valueState
      ? navigate(`/search=${valueState}&page=${pageNumber}`)
      : navigate(`/page=${pageNumber}`);
    //dispatch(setInputValue(valueState));
  }

  if (valueState.length !== valueState.trim().length) {
    nameClass = 'finder finder_color';
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  if (isFetching) {
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
        value={valueState}
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
