import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Card from '../card/Card';
import { useContext, useEffect, useState } from 'react';
import PeopleService from '../api/people';
import CardsCountInput from '../cards-count-input/CardsCountInput';
import CardsPagination from '../cards-pagination/CardsPagination';
import navigateToPage from '../../shared/navigate';
import { InputContext } from '../../pages/home/Home';
import { CardsDataContext } from './CardsWrapper';
import './cards.css';

interface CardsContext {
  setIsLoadingState: (state: boolean) => void;
  isLoading: boolean;
}

export default function Cards() {
  const context = useOutletContext<CardsContext>();
  const inputContext = useContext(InputContext);
  const cardsDataContext = useContext(CardsDataContext);

  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [isCloseDetailed, setIsCloseDetaled] = useState(false);

  const navigate = useNavigate();
  const { page: pageParams } = useParams();

  useEffect(() => {
    function getValuesFromParams(params: string): [string, number] {
      const pageParamsArray = params.split('&').map((item) => item.split('='));
      const searchValue =
        pageParamsArray.length === 2 ? pageParamsArray[0][1] : '';
      const pageNumber =
        pageParamsArray.length === 2
          ? +pageParamsArray[1][1]
          : +pageParamsArray[0][1];

      return [searchValue, pageNumber];
    }

    async function getPeoples(pageParams: string) {
      try {
        const searchParams = getValuesFromParams(pageParams);

        context.setIsLoadingState(true);
        const data = searchParams[0]
          ? await PeopleService.getPeopleByName(...searchParams)
          : await PeopleService.getAllPeople(searchParams[1]);

        setCurrentPage(searchParams[1]);
        cardsDataContext.setCardsData(data.results);
        setIsNextPage(data?.next === null ? false : true);
        setIsPrevPage(data?.previous === null ? false : true);
      } catch (error) {
        console.error(error as Error);
      } finally {
        context.setIsLoadingState(false);
      }
    }

    pageParams
      ? getPeoples(pageParams)
      : navigateToPage(navigate, inputContext.inputValue, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  const cardsList = cardsDataContext.cardsData?.map((item, index) => {
    if (index < cardsPerPage) {
      return <Card cardData={item} setIsCloseDetailed={setIsCloseDetaled} />;
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
            setIsCloseDetaled(true);
          }
        }}
      >
        <CardsCountInput
          onButtonChange={setCardsPerPage}
          counter={cardsPerPage}
        />
        <div className="view-cards__list">
          {context.isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="cards">{cardsList}</div>
          )}
          <CardsPagination
            currentPage={currentPage}
            isNextPage={isNextPage}
            isPrevPage={isPrevPage}
            isLoading={context.isLoading}
          />
        </div>
      </div>
      <Outlet context={{ isCloseDetailed: isCloseDetailed, currentPage }} />
    </div>
  );
}
