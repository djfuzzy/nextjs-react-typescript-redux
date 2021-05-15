import firebase from '../firebase';

import { Comment } from '../../types/Comment';
import { convertTimestampsToDates, getServerTimestamp } from '../helpers';

const COLLECTION_NAME = 'comments';

export const getComments = async (): Promise<Array<Comment>> => {
  const snapshot = await firebase.firestore().collection(COLLECTION_NAME).get();
  const data: Array<Comment> = [];

  snapshot.docs.map((doc) => {
    data.push({
      ...(convertTimestampsToDates(doc.data()) as Comment),
      id: doc.id,
    });
  });

  return data as Array<Comment>;
};

export const getComment = async (id: string): Promise<Comment> => {
  const snapshot = await firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .doc(id)
    .get();

  const data = snapshot.data();

  if (!data) {
    throw new Error(`Unable to find comment with Id ${id}`);
  }

  return {
    ...convertTimestampsToDates(data),
    id: snapshot.id,
  } as Comment;
};

export const addComment = async (comment: Comment): Promise<Comment> => {
  const doc = await firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .add({ ...comment, createdAt: getServerTimestamp() });

  const data = (await doc.get()).data();

  if (!data) {
    throw new Error(`Unable to find comment with Id ${doc.id}`);
  }

  return {
    ...convertTimestampsToDates(data),
    id: doc.id,
  } as Comment;
};

export const updateComment = async (
  id: string,
  comment: Comment
): Promise<Comment> => {
  const snapshot = await firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .doc(id)
    .get();

  const existing = snapshot.data();

  if (!existing) {
    throw new Error(`Unable to find comment with Id ${id}`);
  }

  await snapshot.ref.update({
    ...existing,
    content: comment.content,
    updatedAt: getServerTimestamp(),
  });

  return {
    ...convertTimestampsToDates(
      (await snapshot.ref.get({ source: 'server' })).data()
    ),
    id,
  } as Comment;
};

export const deleteComment = async (id: string): Promise<void> => {
  await firebase.firestore().collection(COLLECTION_NAME).doc(id).delete();
};
