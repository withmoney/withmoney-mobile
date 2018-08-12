import { parseItem } from './parse';
import {
  filterIn,
  filterOut,
  filterPaid,
  filterUnpaid,
} from './filters';

/*
total to pay
total paid
total to pay and paid

*/

export const stringToFloat = string => parseFloat(string);

const parseValueToFloat = transaction => ({
  ...transaction,
  value: stringToFloat(transaction.value),
});

const parseInvertValueOut = transaction => ({
  ...transaction,
  value: transaction.type === 'out' ? transaction.value * -1 : transaction.value,
});

const parseValue = transaction => parseInvertValueOut(parseValueToFloat(transaction));

export const calcTotalInAndOut = transactions => transactions
  .map(parseItem(parseValue))
  .reduce((cur, acc) => acc.value + cur, 0);

export const calcTotalOut = transactions => transactions
  .filter(filterOut)
  .map(parseItem(parseValueToFloat))
  .reduce((cur, acc) => acc.value + cur, 0);

export const calcTotalIn = transactions => transactions
  .filter(filterIn)
  .map(parseItem(parseValue))
  .reduce((cur, acc) => acc.value + cur, 0);


export const calcTotalOutUnpaid = transactions => transactions
  .filter(filterOut)
  .filter(filterUnpaid)
  .map(parseItem(parseValueToFloat))
  .reduce((cur, acc) => acc.value + cur, 0);

export const calcTotalInUnpaid = transactions => transactions
  .filter(filterIn)
  .filter(filterUnpaid)
  .map(parseItem(parseValueToFloat))
  .reduce((cur, acc) => acc.value + cur, 0);

export const calcTotalOutPaid = transactions => transactions
  .filter(filterOut)
  .filter(filterPaid)
  .map(parseItem(parseValueToFloat))
  .reduce((cur, acc) => acc.value + cur, 0);

export const calcTotalInPaid = transactions => transactions
  .filter(filterIn)
  .filter(filterPaid)
  .map(parseItem(parseValueToFloat))
  .reduce((cur, acc) => acc.value + cur, 0);

export const amountInPaid = (totalIn, totalInPaid) => (totalInPaid * 100) / totalIn;

export const amountOutPaid = (totalOut, totalOutPaid) => (totalOutPaid * 100) / totalOut;

