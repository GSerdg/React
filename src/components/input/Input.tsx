import React, { useEffect, useState } from 'react';
import { useSelector } from '@/shared/useSelector';
import { useRouter } from 'next/router';
import { useGetAllPeopleQuery, useGetPeopleByIdQuery } from '../api/people';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@/store/cardsSlice';
import { setInputValue } from '@/store/inputSlice';
import navigateToPage from '@/shared/navigate';

export default function Input() {
  const inputValue = useSelector((state) => state.input.inputValue);
  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = router.query.searchParams;

  const [valueState, setValueState] = useState(inputValue);
  const isFetchingCards = useGetAllPeopleQuery(
    (searchParams as string) ?? skipToken
  ).isFetching;
  const isFetchingDetailed = useGetPeopleByIdQuery(
    (router.query.id as string) ?? skipToken
  ).isFetching;

  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;
  const pageNumber = 1;

  useEffect(() => {
    function getValuesFromParams(params: string) {
      const pageParamsArray = params.split('&').map((item) => item.split('='));
      const searchValue =
        pageParamsArray.length === 2 ? pageParamsArray[0][1] : '';
      const pageNumber =
        pageParamsArray.length === 2
          ? +pageParamsArray[1][1]
          : +pageParamsArray[0][1];

      setValueState(searchValue);
      dispatch(setCurrentPage(pageNumber));
      dispatch(setInputValue(searchValue));
      localStorage.setItem('inputValue', searchValue);
    }

    searchParams && typeof searchParams === 'string'
      ? getValuesFromParams(searchParams)
      : navigateToPage(
          router,
          localStorage.getItem('inputValue') || inputValue,
          1
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setValueState(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    valueState
      ? router.push(`/search=${valueState}&page=${pageNumber}`)
      : router.push(`/page=${pageNumber}`);
    localStorage.setItem('inputValue', valueState || '');
  }

  if (valueState?.length !== valueState?.trim().length) {
    nameClass = 'finder finder_color';
    submitClass = 'submit-button submit-button_disable';
    submitDisable = true;
  }

  if (isFetchingCards || isFetchingDetailed) {
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
        value={valueState || ''}
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
