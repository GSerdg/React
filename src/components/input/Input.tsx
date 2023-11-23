import React, { useEffect, useState } from 'react';
import { useSelector } from '../../shared/useSelector';
import { useRouter } from 'next/router';

export default function Input() {
  const inputValue = useSelector((state) => state.input.inputValue);
  const isFetchingCards = useSelector((state) => state.api.isFetchingCards);
  const isFetchingDetailed = useSelector(
    (state) => state.api.isFetchingDetailed
  );
  //const navigate = useNavigate();
  const router = useRouter();
  const [valueState, setValueState] = useState(inputValue);

  let nameClass = 'finder';
  let submitClass = 'submit-button';
  let submitDisable = false;
  const pageNumber = 1;

  //const { page } = useParams();

  useEffect(() => {
    const { searchParams } = router.query;
    console.log('input', searchParams);
    if (searchParams && typeof searchParams === 'string') {
      const pageParams = searchParams.split('&').map((item) => item.split('='));
      const value = pageParams.length === 2 ? pageParams[0][1] : '';

      setValueState(value);
      localStorage.setItem('inputValue', value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.searchParams]);

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
