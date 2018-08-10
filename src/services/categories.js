import axios from './axios';
import { parseMultDate, mountQuery } from '../utils/parse';

const categoriesFields = {};

const get = (query = {}) => parseMultDate(axios.get(mountQuery('categories', query)), categoriesFields);

export default {
  get,
};
