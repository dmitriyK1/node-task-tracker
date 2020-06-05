import { Sequelize } from 'sequelize';
import { DB_HOST, DB_USER, DB_NAME } from './config';

const connect = async () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, null, {
    host: DB_HOST,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
