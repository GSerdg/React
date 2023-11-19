import { HttpResponse, delay, http } from 'msw';
import { responseById } from './mockData';

export const handlers = [
  http.get('/swapi.dev/api/people/*', async () => {
    await delay(150);
    return HttpResponse.json(responseById.data);
  }),
];
