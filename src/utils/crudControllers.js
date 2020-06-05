import * as HTTP from 'http-status-codes';
import mapValues from 'lodash/mapValues';

import { getSortConfig } from './getSortConfig';

export const getMany = (
  model,
) => async (req, res) => {
  try {
    const result = await model.findAll({
      where: req.query.filter,
      order: getSortConfig(req.query.sort),
    });

    res.status(HTTP.OK).json(result);
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const getOne = (model, additionalParams = { idKey: 'id' }) => async (req, res) => {
  try {
    const result = await model.findOne({
      where: { [additionalParams.idKey]: req.params.id },
    });

    if (result) {
      res.status(HTTP.OK).json(result);
    } else {
      res.status(HTTP.NOT_FOUND).send();
    }
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const createOne = (model) => async (req, res) => {
  try {
    const result = await model.create(req.body);

    res.status(HTTP.CREATED).send(result);
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const updateOne = (model, additionalParams = { idKey: 'id' }) => async (req, res) => {
  try {
    await model.update(req.body, {
      where: { [additionalParams.idKey]: req.params.id },
    });

    res.status(HTTP.OK).send();
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const removeOne = (model, additionalParams = { idKey: 'id' }) => async (req, res) => {
  try {
    const deletedCount = await model.destroy({
      where: {
        [additionalParams.idKey]: req.params.id,
      },
    });

    if (deletedCount) {
      res.status(HTTP.NO_CONTENT).send();
    } else {
      res.status(HTTP.NOT_FOUND).send();
    }
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const crudControllers = (model, additionalParams) => mapValues({
  removeOne,
  updateOne,
  getMany,
  getOne,
  createOne,
}, (controller) => controller(model, additionalParams));
