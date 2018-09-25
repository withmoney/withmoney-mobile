const Category = {
  name: 'Lanche',
};

export const transaction1 = {
  id: 3,
  AccountId: 1,
  name: 'AlmoçoAlmoço 2',
  value: '15.00',
  type: 'out',
  isPaid: false,
  transactionDate: '2018-07-02',
  createdAt: '2018-08-04T21:26:56.000Z',
  updatedAt: '2018-08-04T21:27:07.000Z',
  Category,
};

export const transactions = [
  transaction1,
  {
    id: 2,
    AccountId: 2,
    name: 'Coxinha',
    value: '3.13',
    type: 'out',
    isPaid: false,
    transactionDate: '2018-08-04',
    createdAt: '2018-08-04T19:08:54.000Z',
    updatedAt: '2018-08-04T19:08:54.000Z',
    Category,
  },
  {
    id: 1,
    AccountId: 1,
    name: 'Lanche na Sonia',
    value: '30.90',
    type: 'out',
    isPaid: true,
    transactionDate: '2018-08-04',
    createdAt: '2018-08-04T19:08:54.000Z',
    updatedAt: '2018-08-04T19:08:54.000Z',
    Category,
  },
];

// export const mock = {
//   data: transactions,
//   pagination: {
//     totalItems: 3,
//     currentPage: 1,
//     perPage: 100,
//     totalPages: 1,
//     nextPage: null,
//     previousPage: null,
//   },
// };
