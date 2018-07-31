import qs from 'qs';
import axios from './axios';
import { parseMultDate } from '../utils/parse';

const userFields = {};

const parseUrlQuery = (url, query) => (
  Object.keys(query).length ? `${url}?${qs.stringify(query)}` : url
);

const getUsers = (query = {}) => parseMultDate(axios.get(parseUrlQuery('users', query)), userFields);


const login = (params = {}) => axios.post('login', params);

export default {
  getUsers,
  login,
};
