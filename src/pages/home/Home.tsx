import { useCallback, useEffect, useState } from 'react';
import { PeopleResponse } from '../../types/types';
import Input from '../../components/input/Input';
import PeopleServise from '../../components/api/people';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagination';
import { PATHS } from '../../components/router/router';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Cards from '../../components/cards/Cards';

export default function Home() {
  const valueLs = localStorage.getItem('inputValue');
  let state: string;
  valueLs !== null ? (state = valueLs) : (state = '');

  const [responseData, setData] = useState<PeopleResponse>();
  const [inputValue, SetValue] = useState(state);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    handleShowCards(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleIsNextPage(data: PeopleResponse | undefined) {
    return data?.next === null ? false : true;
  }

  function handleIsPrevPage(data: PeopleResponse | undefined) {
    return data?.previous === null ? false : true;
  }

  async function getPeoples(pageNumber: number, namePeople?: string) {
    try {
      setIsPrevPage(false);
      setIsNextPage(false);
      setIsLoading(true);

      const data = namePeople
        ? await PeopleServise.getPeopleByName(namePeople, pageNumber)
        : await PeopleServise.getAllPeople(pageNumber);

      setData(data);
      setIsPrevPage(handleIsPrevPage(data));
      setIsNextPage(handleIsNextPage(data));
    } catch (error) {
      setIsPrevPage(handleIsPrevPage(responseData));
      setIsNextPage(handleIsNextPage(responseData));
      console.error(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputSubmit(value: string, page: number) {
    if (value === '') {
      getPeoples(page);
    } else {
      getPeoples(page, value);
    }

    setPageNumber(page);
    localStorage.setItem('inputValue', value);
    handleShowCards(page, value);
  }

  function handleInputChange(value: string) {
    SetValue(value);
  }

  const handleShowCards = useCallback(
    (page: number, search?: string) =>
      search
        ? navigate(`${PATHS.HOME}search=${search}&page=${page}`)
        : navigate(`${PATHS.HOME}page=${page}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="page">
      <Button />
      <Input
        onInputSubmit={handleInputSubmit}
        onInputChange={handleInputChange}
        inputValue={inputValue}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Cards respData={responseData?.results || []} />
      )}
      <Pagination
        handleShowCards={handleShowCards}
        onGetNewPage={handleInputSubmit}
        inputValue={inputValue}
        pageNumber={pageNumber}
        isNextPage={isNextPage}
        isPrevPage={isPrevPage}
        isLoading={isLoading}
      />
    </div>
  );
}
