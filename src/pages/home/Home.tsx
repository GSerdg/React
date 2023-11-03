import { useState } from 'react';
import { PeopleResponse } from '../../types/types';
import Cards from '../../components/cards/Cards';
import Input from '../../components/input/Input';
import PeopleServise from '../../components/api/people';
import Button from '../../components/button/Button';
import './home.css';
import Pagination from '../../components/pagination/Pagination';

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

  function handleIsNextPage(data: PeopleResponse | undefined) {
    return data?.next === null ? false : true;
  }

  function handleIsPrevPage(data: PeopleResponse | undefined) {
    return data?.previous === null ? false : true;
  }

  async function getPeopleForName(namePeople: string) {
    try {
      setIsLoading(true);
      const data = await PeopleServise.getPeopleByName(namePeople);
      setIsLoading(false);
      setData(data);
      setIsNextPage(handleIsNextPage(data));
    } catch (error) {
      setIsLoading(false);
      console.error(error as Error);
    }
  }

  async function getPeoples(pageNumber: number) {
    try {
      setIsPrevPage(false);
      setIsNextPage(false);
      setIsLoading(true);
      const data = await PeopleServise.getAllPeople(pageNumber);
      setIsLoading(false);
      setData(data);
      setIsPrevPage(handleIsPrevPage(data));
      setIsNextPage(handleIsNextPage(data));
    } catch (error) {
      setIsLoading(false);
      setIsPrevPage(handleIsPrevPage(responseData));
      setIsNextPage(handleIsNextPage(responseData));
      console.error(error as Error);
    }
  }

  function handleInputSubmit(value: string, page: number) {
    if (value === '') {
      getPeoples(page);
    } else {
      getPeopleForName(value);
    }
    setPageNumber(page);
    localStorage.setItem('inputValue', value);
  }

  function handleInputChange(value: string) {
    SetValue(value);
  }

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
