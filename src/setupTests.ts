import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './test/server';
// import nodeFetch, { Request, Response } from 'node-fetch';

// Object.assign(global, { fetch: nodeFetch, Request, Response });

// Enable API mocking before tests.
beforeAll(() => server.listen(/* { onUnhandledRequest: 'bypass' } */));

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
/* server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});
 */
