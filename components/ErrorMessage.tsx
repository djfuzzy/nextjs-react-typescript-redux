import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  header: string;
  body: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ header, body }) => {
  return (
    <div className={styles['error-message']}>
      <article className="message is-danger">
        <div className="message-header">
          <p>{header}</p>
        </div>
        <div className="message-body">{body}</div>
      </article>
    </div>
  );
};

export default ErrorMessage;
