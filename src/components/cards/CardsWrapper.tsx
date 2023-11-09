import { PeopleResult } from '../../types/types';
import { createContext, useState } from 'react';
import Cards from './Cards';

interface CardsDataObjContext {
  cardsData: PeopleResult[] | undefined;
  setCardsData: (state: PeopleResult[]) => void;
}

export const CardsDataContext = createContext<CardsDataObjContext>(
  {} as CardsDataObjContext
);

export default function CardsWrapper() {
  const [cardsData, setCardsData] = useState<PeopleResult[]>();

  return (
    <CardsDataContext.Provider value={{ cardsData, setCardsData }}>
      <Cards />
    </CardsDataContext.Provider>
  );
}
