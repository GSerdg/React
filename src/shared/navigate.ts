import { NextRouter } from 'next/router';

export default function navigateToPage(
  router: NextRouter,
  inputValue: string | undefined,
  pageNumber: number
) {
  inputValue
    ? router.push(`/search=${inputValue}&page=${pageNumber}`)
    : router.push(`/page=${pageNumber}`);
}
