import qs from 'querystring';
import axios from './axios';
import { parseMultDate } from '../utils/parse';

const transactionsFields = {
  transationDate: 'transactionDate',
};

const mountQuery = (url, query = {}) => {
  if (Object.keys(query).length) {
    return `${url}?${qs.stringify(query)}`;
  }

  return url;
};

const getTransactions = (query = {}) => parseMultDate(axios.get(mountQuery('transactions', query)), transactionsFields);

const getTransaction = (id, query = {}) => parseMultDate(axios.get(mountQuery(`transactions/${id}`, query)), transactionsFields);

export default {
  getTransactions,
  getTransaction,
};
