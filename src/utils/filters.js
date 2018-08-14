
export const filterIn = item => item.type === 'in';

export const filterOut = item => item.type === 'out';

export const filterPaid = item => item.isPaid === true;

export const filterUnpaid = item => item.isPaid === false;

export const onlyIn = transactions => transactions.filter(filterIn);

export const onlyOut = transactions => transactions.filter(filterOut);

export const onlyBy = (transactions, filter) => (
  filter === 'in' ? onlyIn(transactions) : onlyOut(transactions)
);
