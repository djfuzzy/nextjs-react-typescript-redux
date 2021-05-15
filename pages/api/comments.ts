import type { NextApiRequest, NextApiResponse } from 'next';

import { addComment, getComments } from '../../database/repositories/comments';

const list = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const comments = await getComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(`There was an error: ${error}`);
  }
};

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const comment = await addComment(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(`There was an error: ${error}`);
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await list(req, res);
      break;
    case 'POST':
      await create(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(404).end(`Not found`);
  }
};

export default handler;
