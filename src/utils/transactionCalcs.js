import { compose } from 'ramda';
import { parseItem } from './parse';
import {
  filterIn,
  filterOut,
  filterPaid,
  filterUnpaid,
} from './filters';

export const stringToFloat = string => parseFloat(string);

const parseValueToFloat = transaction => ({
  ...transaction,
  value: stringToFloat(transaction.value),
});

const parseInvertValueOut = transaction => ({
  ...transaction,
  value: transaction.type === 'out' ? transaction.value * -1 : transaction.value,
});

const parseValue = compose(
  parseInvertValueOut,
  parseValueToFloat,
);

const filterOutTransactions = transactions => transactions.filter(filterOut);

const filterInTransactions = transactions => transactions.filter(filterIn);

const filterUnpaidTransactions = transactions => transactions.filter(filterUnpaid);

const filterPaidTransactions = transactions => transactions.filter(filterPaid);

const reduceTransactions = transactions => transactions.reduce((cur, acc) => acc.value + cur, 0);

const mapValueToFloat = transactions => transactions.map(parseItem(parseValueToFloat));

const mapparseValue = transactions => transactions.map(parseItem(parseValue));

const reduceAndValueToFloat = compose(
  reduceTransactions,
  mapValueToFloat,
);

const reduceAndValue = compose(
  reduceTransactions,
  mapparseValue,
);

export const calcTotalInAndOut = compose(
  reduceAndValue,
);

export const calcTotalIn = compose(
  reduceAndValue,
  filterInTransactions,
);

export const calcTotalOut = compose(
  reduceAndValueToFloat,
  filterOutTransactions,
);

export const calcTotalOutUnpaid = compose(
  reduceAndValueToFloat,
  filterOutTransactions,
  filterUnpaidTransactions,
);

export const calcTotalInUnpaid = compose(
  reduceAndValueToFloat,
  filterInTransactions,
  filterUnpaidTransactions,
);

export const calcTotalOutPaid = compose(
  reduceAndValueToFloat,
  filterOutTransactions,
  filterPaidTransactions,
);

export const calcTotalInPaid = compose(
  reduceAndValueToFloat,
  filterInTransactions,
  filterPaidTransactions,
);

export const amountInPaid = (totalIn, totalInPaid) => (totalInPaid * 100) / totalIn;

export const amountOutPaid = (totalOut, totalOutPaid) => (totalOutPaid * 100) / totalOut;
