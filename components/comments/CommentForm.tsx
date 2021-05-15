import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formatRelative } from 'date-fns';

import { Comment } from '../../types/Comment';

import styles from './CommentForm.module.scss';

type CommentFormProps = {
  comment?: Comment;
  title?: string;
  nameLabel?: string;
  nameIsReadOnly?: boolean;
  commentLabel?: string;
  submitButtonLabel: string;
  isCancelButtonDisplayed?: boolean;
  isSaving: boolean;
  isSaveFailed: boolean;
  isSaveSucceeded: boolean;
  resetOnSaveSucceeded?: boolean;
  onSaving(comment: Comment): void;
  onCancel?(): void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  title = 'Comment',
  nameLabel,
  nameIsReadOnly,
  commentLabel,
  submitButtonLabel,
  isCancelButtonDisplayed,
  isSaving,
  isSaveFailed,
  isSaveSucceeded,
  resetOnSaveSucceeded,
  onSaving,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({ defaultValues: comment });

  const getFormattedRelativeDate = (
    date: Date | string,
    initialUpperCase?: boolean
  ): string => {
    const formattedDate = formatRelative(new Date(date), new Date());

    return initialUpperCase
      ? formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      : formattedDate;
  };

  const onSubmit = async (comment: Comment): Promise<void> => {
    onSaving(comment);
  };

  useEffect(() => {
    if (resetOnSaveSucceeded && isSaveSucceeded) {
      reset();
    }
  }, [isSaveSucceeded, reset, resetOnSaveSucceeded]);

  return (
    <div className={styles['comment-form']}>
      <div className="card my-3">
        <header className="card-header">
          <p className="card-header-title">{title}</p>
        </header>
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              {isSaveFailed && (
                <div className="notification is-danger">
                  There was a problem saving your comment. Please try again.
                </div>
              )}
              {comment && (
                <div className="field">
                  <p>
                    Added {getFormattedRelativeDate(comment.createdAt)} by{' '}
                    <strong>{comment.name}</strong>
                  </p>
                </div>
              )}
              {comment && comment.updatedAt && (
                <div className="field">
                  <p>
                    <em>
                      Updated {getFormattedRelativeDate(comment.updatedAt)}
                    </em>
                  </p>
                </div>
              )}
              {!comment && (
                <div className="field">
                  {nameLabel && (
                    <label className="label" htmlFor="name">
                      {nameLabel}
                    </label>
                  )}
                  <div className="control">
                    <input
                      {...register('name', { required: true })}
                      name="name"
                      className={`input ${
                        nameIsReadOnly ? 'has-text-grey-light' : ''
                      } ${errors.name ? 'is-danger' : ''}`}
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      disabled={isSaving}
                      readOnly={nameIsReadOnly}
                    />
                    {errors.name && (
                      <p className="help is-danger">You must enter your name</p>
                    )}
                  </div>
                </div>
              )}
              <div className="field">
                {commentLabel && (
                  <label className="label" htmlFor="content">
                    {commentLabel}
                  </label>
                )}
                <div className="control">
                  <textarea
                    {...register('content', {
                      required: true,
                    })}
                    name="content"
                    className={`textarea ${errors.name ? 'is-danger' : ''}`}
                    maxLength={500}
                    placeholder="e.g. These pretzils are making me thirsty."
                    disabled={isSaving}
                  ></textarea>
                  {errors.content && (
                    <p className="help is-danger">You must enter a comment</p>
                  )}
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className={`button is-link ${isSaving ? 'is-loading' : ''}`}
                    type="submit"
                    disabled={isSaving}
                  >
                    {submitButtonLabel}
                  </button>
                </div>
                {isCancelButtonDisplayed && (
                  <div className="control">
                    <button
                      className="button is-link is-light"
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
