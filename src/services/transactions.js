import axios from './axios';

import { parseMultDate } from '../utils/parse';

const transactionsFields = {
  transationDate: 'transactionDate',
};

const getTransactions = () => parseMultDate(axios.get('transactions'), transactionsFields);

const getTransaction = id => parseMultDate(axios.get(`transactions/${id}`), transactionsFields);

export default {
  getTransactions,
  getTransaction,
};
