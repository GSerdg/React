import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { PeopleResult } from '../../types/types';
import Card from '../card/Card';
import { useEffect, useState } from 'react';
import PeopleService from '../api/people';
import CardsCountInput from '../cards-count-input/CardsCountInput';
import CardsPagination from '../cards-pagination/CardsPagination';
import navigateToPage from '../../shared/navigate';
import './cards.css';

interface CardsContext {
  setIsLoadingState: (state: boolean) => void;
  isLoading: boolean;
}

export default function Cards() {
  const context = useOutletContext<CardsContext>();
  const [cardsData, setCardsData] = useState<PeopleResult[]>();
  const [cardsOnPage, setCardsOnPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);

  const navigate = useNavigate();
  const { page: pageParams } = useParams();

  useEffect(() => {
    async function getPeoples(pageParams: string) {
      try {
        const pageParamsArray = pageParams
          .split('&')
          .map((item) => item.split('='));
        const searchValue =
          pageParamsArray.length === 2 ? pageParamsArray[0][1] : '';
        const pageNumber =
          pageParamsArray.length === 2
            ? +pageParamsArray[1][1]
            : +pageParamsArray[0][1];

        context.setIsLoadingState(true);
        const data = searchValue
          ? await PeopleService.getPeopleByName(searchValue, pageNumber)
          : await PeopleService.getAllPeople(pageNumber);

        setPageNumber(pageNumber);
        setCardsData(data.results);
        setIsNextPage(data?.next === null ? false : true);
        setIsPrevPage(data?.previous === null ? false : true);
      } catch (error) {
        console.error(error as Error);
      } finally {
        context.setIsLoadingState(false);
      }
    }

    pageParams ? getPeoples(pageParams) : navigateToPage(navigate, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  const cardsList = cardsData?.map((item, index) => {
    if (index < cardsOnPage) {
      return <Card cardData={item} key={item.url} />;
    }
  });

  return (
    <div className="view-cards">
      <div
        className="cards__container"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const target = event.target as HTMLElement;
          if (
            target.classList[0] === 'view-cards__list' ||
            target.classList[0] === 'cards'
          ) {
            navigate('../');
          }
        }}
      >
        <CardsCountInput
          onButtonChange={setCardsOnPage}
          counter={cardsOnPage}
        />
        <div className="view-cards__list">
          {context.isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="cards">{cardsList}</div>
          )}
          <CardsPagination
            currentPage={pageNumber}
            isNextPage={isNextPage}
            isPrevPage={isPrevPage}
            isLoading={context.isLoading}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
  return;
}
