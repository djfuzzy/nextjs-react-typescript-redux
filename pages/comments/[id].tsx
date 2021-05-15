import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import CommentPage, {
  CommentPageProps,
} from '../../components/comments/CommentPage';
import { getComment } from '../../database/repositories/comments';

const SsrCommentPage: NextPage<CommentPageProps> = ({ comment }) => {
  return (
    <>
      <Head>
        <title>Comment</title>
      </Head>
      <CommentPage comment={comment} />
    </>
  );
};

export default SsrCommentPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof context.query.id !== 'string') {
    throw new Error(`The input was not formatted correctly.`);
  }

  try {
    const comment = await getComment(context.query.id);

    return {
      props: { comment },
    };
  } catch (error) {
    // TODO: Pass error to page
    return {
      props: {},
    };
  }
};
