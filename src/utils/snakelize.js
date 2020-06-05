import snakeCase from 'lodash/snakeCase';
import mapKeys from 'lodash/mapKeys';

export const snakelize = (object) => mapKeys(object, (value, key) => snakeCase(key));
