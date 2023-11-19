import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import cardsReducer from './cardsSlice';
import apiReducer from './apiSlice';
import { peopleApi } from '../components/api/people';

const rootReducer = combineReducers({
  [peopleApi.reducerPath]: peopleApi.reducer,
  input: inputReducer,
  cards: cardsReducer,
  api: apiReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
