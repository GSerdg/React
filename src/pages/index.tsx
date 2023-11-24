// // import Home from '@/components/home/Home';

// export default function App() {
//   return (
//     <></>
//     /*     <div className="app">
//       <h1>React APP</h1>
//       <Home />
//     </div>
//  */
//   );
// }
import { useEffect, type ReactElement } from 'react';
// import CardsLayout from '@/components/layouts/CardsLayout';
import HomeLayout from '@/components/layouts/HomeLayout';
import type { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/page=1`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Page;

export async function getStaticProps() {
  return {
    props: {},
  };
}
