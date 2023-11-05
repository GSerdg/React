import { useCallback, useEffect, useState } from 'react';
import { PeopleResponse } from '../../types/types';
import Input from '../../components/input/Input';
import PeopleServise from '../../components/api/people';
import Button from '../../components/button/Button';
import CardsPagination from '../../components/cards-pagination/Cards-pagination';
import { PATHS } from '../../components/router/router';
import './home.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cards from '../../components/cards/Cards';
import CardsOnPage from '../../components/cards-on-page/Cards-on-page';

export default function Home() {
  const valueLs = localStorage.getItem('inputValue');
  let state: string;
  valueLs !== null ? (state = valueLs) : (state = '');
  let value: string | undefined;
  let number: number | undefined;

  const [responseData, setData] = useState<PeopleResponse>();
  const [inputValue, SetValue] = useState(state);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [counter, setCounter] = useState(10);
  const [submitCounter, setSubmitCounter] = useState(10);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { page } = useParams();

  if (page) {
    const pageParams = page.split('&').map((item) => item.split('='));
    value = pageParams.length === 2 ? pageParams[0][1] : '';
    number = pageParams.length === 2 ? +pageParams[1][1] : +pageParams[0][1];
  }
  if (page === undefined) {
    value = inputValue;
    number = pageNumber;
  }

  const handleInputSubmit = useCallback((value: string, page: number) => {
    getPeoples(page, value);
    setPageNumber(page);
    SetValue(value);
    localStorage.setItem('inputValue', value);
    handleShowCards(page, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleInputSubmit(value || '', number || 1);
  }, [handleInputSubmit, number, value]);

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
      navigate(PATHS.NOT_FPUND);
      setTimeout(() => navigate(PATHS.HOME), 5000);
      console.error(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(value: string) {
    SetValue(value);
  }

  const handleShowCards = (page: number, search?: string) =>
    search
      ? navigate(`${PATHS.HOME}search=${search}&page=${page}`)
      : navigate(`${PATHS.HOME}page=${page}`);

  function handleButtonChange(counter: number) {
    setCounter(counter);
  }

  function handleClick() {
    setError(true);
  }

  if (error) {
    throw new Error('You generate some error');
  }

  function handleBtnClick() {
    const page = 1;
    setSubmitCounter(counter);
    handleInputSubmit(inputValue, page);
  }

  return (
    <div className="page">
      <Button title={'Error'} onHandleClick={handleClick} />
      <Input
        onInputSubmit={handleShowCards}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        pageNumber={pageNumber}
        isLoading={isLoading}
      />
      <CardsOnPage
        onHandleBtnClick={handleBtnClick}
        onButtonChange={handleButtonChange}
        counter={counter}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Cards respData={responseData?.results || []} counter={submitCounter} />
      )}
      <CardsPagination
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
