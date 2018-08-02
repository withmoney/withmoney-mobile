import axios from './axios';
import { parseMultDate, mountQuery } from '../utils/parse';

const transactionsFields = {
  transationDate: 'transactionDate',
};

const getTransactions = (query = {}) => parseMultDate(axios.get(mountQuery('transactions', query)), transactionsFields);

const getTransaction = (id, query = {}) => parseMultDate(axios.get(mountQuery(`transactions/${id}`, query)), transactionsFields);

export default {
  getTransactions,
  getTransaction,
};
