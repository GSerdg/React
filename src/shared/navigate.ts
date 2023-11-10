import { NavigateFunction } from 'react-router-dom';

export default function navigateToPage(
  navigate: NavigateFunction,
  inputValue: string,
  pageNumber: number
) {
  inputValue
    ? navigate(`/search=${inputValue}&page=${pageNumber}`)
    : navigate(`/page=${pageNumber}`);
}
