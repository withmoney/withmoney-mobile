import axios from './axios';
import { parseMultDate, mountQuery } from '../utils/parse';

const accountsFields = {};

const get = (query = {}) => parseMultDate(axios.get(mountQuery('accounts', query)), accountsFields);

export default {
  get,
};
