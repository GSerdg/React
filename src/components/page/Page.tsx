import { useState } from 'react';
import { PeopleResult } from '../../types/types';
import Cards from '../cards/Cards';
import Input from '../input/Input';
import PeopleServise from '../api/people';
import Button from '../button/Button';
import './page.css';

export default function Page() {
  const [people, setPeople] = useState<PeopleResult[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getPeopleForName(namePeople: string) {
    try {
      setIsLoading(true);
      const { results } = await PeopleServise.getPeopleByName(namePeople);
      setIsLoading(false);
      setPeople(results);
    } catch (error) {
      setIsLoading(false);
      console.error(error as Error);
    }
  }

  async function getPeoples() {
    try {
      setIsLoading(true);
      const { results } = await PeopleServise.getAllPeople();
      setIsLoading(false);
      setPeople(results);
    } catch (error) {
      setIsLoading(false);
      console.error(error as Error);
    }
  }

  function handleInputSubmit(inputValue: string) {
    if (inputValue === '') {
      getPeoples();
    } else {
      getPeopleForName(inputValue);
    }
    localStorage.setItem('inputValue', inputValue);
  }

  return (
    <div className="page">
      <Button />
      <Input onInputSubmit={handleInputSubmit} />
      {isLoading ? <div>Loading...</div> : <Cards respData={people} />}
    </div>
  );
}
