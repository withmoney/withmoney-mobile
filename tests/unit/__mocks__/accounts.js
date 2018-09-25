export const account1 = {
  id: 1,
  UserId: 1,
  name: 'Banco Inter',
  type: 'checking_account',
  initalValue: '505.18',
  createdAt: '2018-08-04T14:33:21.000Z',
  updatedAt: '2018-08-04T14:33:21.000Z',
};

export const account2 = {
  id: 2,
  UserId: 1,
  name: 'Carteira',
  type: 'wallet',
  initalValue: '650.00',
  createdAt: '2018-08-04T14:33:21.000Z',
  updatedAt: '2018-08-04T14:33:21.000Z',
};

export const accounts = [account1, account2];

export default {
  data: accounts,
  pagination: {
    totalItems: 2,
    currentPage: 1,
    perPage: 100,
    totalPages: 1,
    nextPage: null,
    previousPage: null,
  },
};
