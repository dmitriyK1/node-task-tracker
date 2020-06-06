import * as HTTP from 'http-status-codes';

import { crudControllers } from '../../utils/crudControllers';
import { Task } from './task.model';
import { User } from '../user/user.model';

const createOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.user_id);

    if (!user) {
      return res.status(HTTP.BAD_REQUEST).send();
    }

    const task = await Task.create(req.body);

    res.status(HTTP.CREATED).send(task);
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

const updateTask = async (req, res) => {
  try {
    if (req.body.user_id) {
      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(HTTP.BAD_REQUEST).send();
      }
    }

    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(HTTP.NOT_FOUND).send();
    }

    await task.update(req.body);

    res.status(HTTP.OK).send();
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const taskControllers = {
  ...crudControllers(Task),
  createOne,
  updateTask,
};
