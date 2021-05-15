import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import commentReducer from './slices/comments';
import { ErrorResponse } from '../types/ErrorResponse';

const rootReducer = combineReducers({
  comments: commentReducer,
});

export type ErrorResult = {
  error: ErrorResponse | string;
};

export type ThunkConfig = { rejectValue: ErrorResult };

export type CoreState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
