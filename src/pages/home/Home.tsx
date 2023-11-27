import { useState } from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Outlet } from 'react-router-dom';
import './home.css';

export default function Home() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('You generate some error');
  }

  function handleClickErrorBtn() {
    setError(true);
  }

  return (
    <div className="page">
      <Button title={'Error'} onHandleClick={handleClickErrorBtn} />
      <Input />
      <Outlet />
    </div>
  );
}
