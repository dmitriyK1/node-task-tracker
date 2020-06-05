import express from 'express';
import { taskControllers } from './task.controller';

const router = express.Router();

router.route('/')
  .get(taskControllers.getMany)
  .post(taskControllers.createOne);

router.route('/:id')
  .get(taskControllers.getOne)
  .delete(taskControllers.removeOne)
  .put(taskControllers.updateTask);

export default router;
