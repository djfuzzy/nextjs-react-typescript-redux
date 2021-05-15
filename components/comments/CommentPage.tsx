import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CommentForm from '../../components/comments/CommentForm';
import {
  resetSaveState,
  selectCommentSaveState,
  updateComment,
} from '../../store/slices/comments';
import { ActionState } from '../../types/ActionState';
import { Comment } from '../../types/Comment';

export type CommentPageProps = {
  comment: Comment;
};

const CommentPage: NextPage<CommentPageProps> = ({ comment }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const saveState = useSelector(selectCommentSaveState);
  const isSaving = saveState === ActionState.Processing;
  const isSaveFailed = saveState === ActionState.Failed;
  const isSaveSucceeded = saveState === ActionState.Completed;

  const onSaving = async (comment: Comment): Promise<void> => {
    dispatch(updateComment({ id: comment.id, comment }));
  };

  const onCancel = (): void => {
    router.push('/');
  };

  useEffect(() => {
    if (saveState !== ActionState.Initial) {
      dispatch(resetSaveState());
    }
    if (isSaveSucceeded) {
      router.push('/');
    }
  }, [dispatch, isSaveSucceeded, router, saveState]);

  return (
    <section className="section">
      <div className="container">
        <CommentForm
          comment={comment}
          nameIsReadOnly={true}
          submitButtonLabel="Update"
          isCancelButtonDisplayed={true}
          isSaving={isSaving}
          isSaveFailed={isSaveFailed}
          isSaveSucceeded={isSaveSucceeded}
          onSaving={(comment) => onSaving(comment)}
          onCancel={onCancel}
        />
      </div>
    </section>
  );
};

export default CommentPage;
