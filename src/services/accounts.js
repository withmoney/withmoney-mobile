import axios from './axios';
import { parseMultDate, mountQuery } from '../utils/parse';

const accountsFields = {};
const model = 'accounts';

const list = (query = {}) => parseMultDate(axios.get(mountQuery(model, query)), accountsFields);

const get = id => parseMultDate(axios.get(`${model}/${id}`), accountsFields);

const create = params => parseMultDate(axios.post(model, params), accountsFields);

const update = (id, params) => parseMultDate(axios.put(`${model}/${id}`, params), accountsFields);

const destroy = id => axios.delete(`${model}/${id}`);

export default {
  list,
  get,
  create,
  update,
  destroy,
};
