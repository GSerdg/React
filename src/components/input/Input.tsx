import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setInputValue } from '../../app/inputSlice';
import './Inputs.css';

interface InputProps {
  searchInput: boolean;
}

export default function Input(props: InputProps) {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const dispatch = useDispatch();
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

      dispatch(setInputValue(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    localStorage.setItem('inputValue', valueState);
    dispatch(setInputValue(valueState));
  }

  if (valueState.length !== valueState.trim().length) {
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
