import { useState } from 'react';
import './button.css';

export default function Button() {
  const [error, setError] = useState(false);

  function handleClick() {
    setError(true);
  }

  if (error) {
    throw new Error('You generate some error');
  }

  return (
    <button onClick={handleClick} className="button">
      Error
    </button>
  );
}
