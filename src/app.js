import express from 'express';
import helmet from 'helmet';

import userRoutes from './components/user/user.route';
import taskRoutes from './components/task/task.route';
import { API_V1 } from './constants';
import { snakelize } from './utils/snakelize';

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`${API_V1}`, (req, res, next) => {
  req.body = snakelize(req.body);
  next();
});

app.use(`${API_V1}/users`, userRoutes);
app.use(`${API_V1}/tasks`, taskRoutes);

app.get('*', (req, res, next) => {
  const err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

export { app };
