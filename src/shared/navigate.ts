import { NavigateFunction } from 'react-router-dom';
import { PATHS } from '../main';

export default function navigateToPage(
  navigate: NavigateFunction,
  pageNumber: number
) {
  const inputValue = localStorage.getItem('inputValue') || '';
  inputValue
    ? navigate(`${PATHS.HOME}search=${inputValue}&page=${pageNumber}`)
    : navigate(`${PATHS.HOME}page=${pageNumber}`);
}
