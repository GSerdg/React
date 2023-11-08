import { NavigateFunction } from 'react-router-dom';
import { PATHS } from '../main';

export default function navigateToPage(
  navigate: NavigateFunction,
  inputValue: string,
  pageNumber: number
) {
  inputValue
    ? navigate(`${PATHS.HOME}search=${inputValue}&page=${pageNumber}`)
    : navigate(`${PATHS.HOME}page=${pageNumber}`);
}
