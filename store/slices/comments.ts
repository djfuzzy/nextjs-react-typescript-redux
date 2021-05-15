import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { CoreState, ThunkConfig } from '..';
import { ActionState } from '../../types/ActionState';
import { Comment } from '../../types/Comment';
import { ErrorResponse } from '../../types/ErrorResponse';
import * as httpClient from '../../utils/httpClient';

const COMMENT_API_PATH = '/api/comments';

const commentAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

type CommentState = {
  loadState: ActionState;
  saveState: ActionState;
  selectedCommentId?: string;
  saveError?: ErrorResponse | string;
} & EntityState<Comment>;

const initialState: CommentState = commentAdapter.getInitialState({
  loadState: ActionState.Initial,
  saveState: ActionState.Initial,
});

export const resetSaveState = createAction<void>('comments/resetSaveState');

export const selectComment = createAction<string>('comments/selectComment');

export const loadComments = createAsyncThunk<Comment[], void, ThunkConfig>(
  'comments/loadComments',
  async (_, thunkApi) => {
    try {
      return await httpClient.get<Comment[]>(COMMENT_API_PATH);
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const addComment = createAsyncThunk<Comment, Comment, ThunkConfig>(
  'comments/addComment',
  async (comment, thunkApi) => {
    try {
      return await httpClient.post<Comment>(COMMENT_API_PATH, comment);
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const updateComment = createAsyncThunk<
  Comment,
  { id: string; comment: Comment },
  ThunkConfig
>('comments/updateComment', async ({ id, comment }, thunkApi) => {
  try {
    return await httpClient.put<Comment>(`${COMMENT_API_PATH}/${id}`, comment);
  } catch (error) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const commentSlice = createSlice({
  name: 'comments',
  initialState: commentAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetSaveState, (state) => {
      state.saveState = ActionState.Initial;
    });
    builder.addCase(selectComment, (state, action) => {
      state.selectedCommentId = action.payload;
    });
    builder.addCase(loadComments.pending, (state) => {
      state.loadState = ActionState.Processing;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      commentAdapter.setAll(state, action.payload);
      state.loadState = ActionState.Completed;
    });
    builder.addCase(loadComments.rejected, (state) => {
      state.loadState = ActionState.Failed;
    });
    builder.addCase(addComment.pending, (state) => {
      state.saveState = ActionState.Processing;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      commentAdapter.addOne(state, action.payload);
      state.saveState = ActionState.Completed;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.saveState = ActionState.Failed;
      state.saveError = action.payload?.error;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.saveState = ActionState.Processing;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      commentAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
      state.saveState = ActionState.Completed;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.saveState = ActionState.Failed;
      state.saveError = action.payload?.error;
    });
  },
});

export const commentSelectors = commentAdapter.getSelectors(
  (state: CoreState) => state.comments
);

export const selectCommentLoadState = createSelector(
  (state: CoreState) => state.comments.loadState,
  (commentSaveState: ActionState): ActionState => commentSaveState
);

export const selectCommentSaveState = createSelector(
  (state: CoreState) => state.comments.saveState,
  (commentSaveState: ActionState): ActionState => commentSaveState
);

export const selectAllComments = createSelector(
  (state: CoreState) => state,
  (state: CoreState) => commentSelectors.selectAll(state)
);

export const selectSelectedComment = createSelector(
  (state: CoreState) => state,
  (state: CoreState) =>
    state.comments.selectedCommentId
      ? commentSelectors.selectById(state, state.comments.selectedCommentId)
      : undefined
);

export default commentSlice.reducer;
