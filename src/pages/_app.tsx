/* import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { setupStore } from '@/store/store';
import { Provider } from 'react-redux';
import Home from '@/components/home/Home';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={setupStore()}>
      <div className="app">
        <h1>React APP</h1>
        <Home />
      </div>
      <Component {...pageProps} />
    </Provider>
  );
} */
import '@/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
import { /* setupStore, */ wrapper } from '@/store/store';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    // <Provider store={setupStore()}>
    <>{getLayout(<Component {...pageProps} />)}</>
    // </Provider>
  );
}

export default wrapper.withRedux(App);
