import { crudControllers } from '../../utils/crudControllers';
import { User } from './user.model';

export const userControllers = crudControllers(User);
