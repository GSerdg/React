import { HttpResponse, delay, http } from 'msw';
import { responseAll, responseById, responseEmpty } from './mockData';

export const handlers = [
  http.get('https://swapi.dev/api/people/*', async () => {
    await delay(150);
    return HttpResponse.json(responseById.data);
  }),
  http.get('https://swapi.dev/api/people', ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get('page');

    if (!productId) {
      return new HttpResponse(null, { status: 404 });
    }

    if (productId === '2') {
      return HttpResponse.json(responseEmpty.data);
    }

    return HttpResponse.json(responseAll.data);
  }),
];
