import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import {
  addComment,
  loadComments,
  resetSaveState,
  selectAllComments,
  selectComment,
  selectCommentLoadState,
  selectCommentSaveState,
} from '../store/slices/comments';
import { ActionState } from '../types/ActionState';
import { Comment } from '../types/Comment';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const comments = useSelector(selectAllComments);

  const loadingState = useSelector(selectCommentLoadState);
  const isLoading = loadingState === ActionState.Processing;

  const saveState = useSelector(selectCommentSaveState);
  const isSaving = saveState === ActionState.Processing;
  const isSaveFailed = saveState === ActionState.Failed;
  const isSaveSucceeded = saveState === ActionState.Completed;

  const onSaving = async (comment: Comment): Promise<void> => {
    dispatch(addComment(comment));
  };

  const onCommentSelect = (comment: Comment): void => {
    dispatch(selectComment(comment.id));
    router.push(`/comments/selected`, `/comments/${comment.id}`);
  };

  useEffect(() => {
    if (loadingState === ActionState.Initial) {
      dispatch(loadComments());
    }
    if (isSaveSucceeded) {
      dispatch(resetSaveState());
    }
  }, [dispatch, comments, loadingState, isSaveSucceeded, saveState]);

  return (
    <>
      <Head>
        <title>Next.js Demo</title>
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">Next.js Demo</h1>
          <p className="has-text-centered">With:</p>
          <ul className="has-text-centered">
            <li>
              <strong>React</strong>
            </li>
            <li>
              <strong>Typescript</strong>
            </li>
            <li>
              <strong>Redux Toolkit</strong>
            </li>
            <li>
              <strong>Firebase</strong>
            </li>
            <li>
              <strong>Bulma</strong>
            </li>
            <li>and more...</li>
          </ul>
          <CommentForm
            title="Add new comment"
            nameLabel="Enter your name"
            commentLabel="Enter a comment"
            submitButtonLabel="Submit"
            isSaving={isSaving}
            isSaveFailed={isSaveFailed}
            isSaveSucceeded={isSaveSucceeded}
            resetOnSaveSucceeded={true}
            onSaving={onSaving}
          />
          <CommentList
            comments={comments}
            isLoading={isLoading}
            onCommentSelect={onCommentSelect}
          />
        </div>
      </section>
    </>
  );
};

export default Index;
