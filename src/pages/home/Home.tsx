import { createContext, useState } from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Outlet } from 'react-router-dom';
import './home.css';

interface InputObjContext {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputContext = createContext<InputObjContext | undefined>(
  undefined
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || ''
  );

  if (error) {
    throw new Error('You generate some error');
  }

  function setIsLoadingState(state: boolean) {
    setIsLoading(state);
  }

  function handleClickErrorBtn() {
    setError(true);
  }

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      <div className="page">
        <Button title={'Error'} onHandleClick={handleClickErrorBtn} />
        <Input searchInput={isLoading} />
        <Outlet context={{ setIsLoadingState, isLoading }} />
      </div>
    </InputContext.Provider>
  );
}
