import formatRelative from 'date-fns/formatRelative';

import { Comment } from '../../types/Comment';

import styles from './CommentList.module.scss';

type CommentListProps = {
  comments: Comment[];
  isLoading: boolean;
  onCommentSelect(comment: Comment): void;
};

const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading,
  onCommentSelect,
}) => {
  const getFormattedDate = (date: Date | string): string => {
    const formattedDate = formatRelative(new Date(date), new Date());

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  return (
    <div className={styles['comment-list']}>
      <div className="card my-3">
        <div className="card-content">
          <div className="content">
            <table
              className={`table is-hoverable ${isLoading ? 'is-loading' : ''}`}
            >
              <thead>
                <tr>
                  <th>Added</th>
                  <th>Name</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={3} className="has-text-centered">
                      <label>
                        <progress
                          className="progress is-small is-primary mt-3"
                          max="100"
                        >
                          Loading...
                        </progress>
                        Loading...
                      </label>
                    </td>
                  </tr>
                )}
                {!isLoading && comments && comments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="has-text-centered">
                      There are no comments yet.
                    </td>
                  </tr>
                )}
                {comments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="is-clickable"
                    onClick={() => onCommentSelect(comment)}
                  >
                    <td>{getFormattedDate(comment.createdAt)}</td>
                    <td>{comment.name}</td>
                    <td>{comment.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
