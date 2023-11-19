import { HttpResponse, delay, http } from 'msw';
import { responseById } from './mockData';

export const handlers = [
  http.get('https://swapi.dev/api/people/4', async () => {
    await delay(150);
    console.log(HttpResponse.json(responseById.data));
    return HttpResponse.json(responseById);
  }),
];
