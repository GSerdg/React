import Cards from '@/components/cards/Cards';
import { ReactElement } from 'react';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="view-cards">
      <Cards />
      {children}
    </div>
  );
}
