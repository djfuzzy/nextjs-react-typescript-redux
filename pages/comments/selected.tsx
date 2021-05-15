import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import Head from 'next/head';

import CommentPage from '../../components/comments/CommentPage';
import { selectSelectedComment } from '../../store/slices/comments';
import ErrorMessage from '../../components/ErrorMessage';

const SelectedCommentPage: NextPage = () => {
  const comment = useSelector(selectSelectedComment);

  return (
    <>
      <Head>
        <title>Comment</title>
      </Head>
      {comment && <CommentPage comment={comment} />}
      {!comment && (
        <section className="section">
          <div className="container">
            <ErrorMessage header="Error" body="There is no comment selected." />
          </div>
        </section>
      )}
    </>
  );
};

export default SelectedCommentPage;
