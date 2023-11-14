import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import cardsPerPageReducer from './cardsPerPageSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    cardsPerPage: cardsPerPageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
