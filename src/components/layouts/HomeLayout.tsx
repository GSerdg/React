import Home from '@/components/home/Home';
import { ReactElement } from 'react';

export default function Layout({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div className="app">
      <h1>React APP</h1>
      <Home />
      {children}
    </div>
  );
}
