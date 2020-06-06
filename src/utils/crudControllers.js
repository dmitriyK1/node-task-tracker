import * as HTTP from 'http-status-codes';
import mapValues from 'lodash/mapValues';

import { getSortConfig } from './getSortConfig';

export const getMany = (
  model,
) => async (req, res) => {
  try {
    const entities = await model.findAll({
      where: req.query.filter,
      order: getSortConfig(req.query.sort),
    });

    res.status(HTTP.OK).json(entities);
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const getOne = (model) => async (req, res) => {
  try {
    const entity = await model.findByPk(req.params.id);

    if (entity) {
      res.status(HTTP.OK).json(entity);
    } else {
      res.status(HTTP.NOT_FOUND).send();
    }
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const createOne = (model) => async (req, res) => {
  try {
    const entity = await model.create(req.body);

    res.status(HTTP.CREATED).send(entity);
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    const entity = await model.findByPk(req.params.id);

    await entity.update(req.body);
    res.status(HTTP.OK).send();
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const removeOne = (model) => async (req, res) => {
  try {
    const entity = await model.findByPk(req.params.id);

    if (entity) {
      await entity.destroy();
      res.status(HTTP.NO_CONTENT).send();
    } else {
      res.status(HTTP.NOT_FOUND).send();
    }
  } catch {
    res.status(HTTP.INTERNAL_SERVER_ERROR).send();
  }
};

export const crudControllers = (model) => mapValues({
  removeOne,
  updateOne,
  getMany,
  getOne,
  createOne,
}, (controller) => controller(model));
