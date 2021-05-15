import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getComment,
  updateComment,
} from '../../../database/repositories/comments';

const find = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const comment = await getComment(req.query.id as string);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(`There was an error: ${error}`);
  }
};

const update = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const comment = await updateComment(req.query.id as string, req.body);
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
      await find(req, res);
      break;
    case 'PUT':
      await update(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(404).end(`Not found`);
  }
};

export default handler;
