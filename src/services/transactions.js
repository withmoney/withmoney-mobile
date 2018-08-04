import axios from './axios';
import { parseMultDate, mountQuery } from '../utils/parse';

const transactionsFields = {};

const getTransactions = (query = {}) => parseMultDate(axios.get(mountQuery('transactions', query)), transactionsFields);

const getTransaction = (id, query = {}) => parseMultDate(axios.get(mountQuery(`transactions/${id}`, query)), transactionsFields);

const create = params => parseMultDate(axios.post('transactions', params), transactionsFields);

const update = (id, params) => parseMultDate(axios.put(`transactions/${id}`, params), transactionsFields);

export default {
  getTransactions,
  getTransaction,
  create,
  update,
};
