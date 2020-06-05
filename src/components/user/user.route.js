import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.route('/')
  .get(userControllers.getMany)
  .post(userControllers.createOne);

router.route('/:id')
  .get(userControllers.getOne)
  .put(userControllers.updateOne)
  .delete(userControllers.removeOne);

export default router;
