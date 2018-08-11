export const category1 = {
  id: 1,
  UserId: 1,
  name: 'Salario',
  type: 'in',
  createdAt: '2018-08-04T14:33:21.000Z',
  updatedAt: '2018-08-04T14:33:21.000Z',
};

export const category2 = {
  id: 2,
  UserId: 1,
  name: 'Lanche',
  type: 'out',
  initalValue: '650.00',
  createdAt: '2018-08-04T14:33:21.000Z',
  updatedAt: '2018-08-04T14:33:21.000Z',
};

export const categories = [category1, category2];

export default {
  data: categories,
  pagination: {
    totalItems: 2,
    currentPage: 1,
    perPage: 100,
    totalPages: 1,
    nextPage: null,
    previousPage: null,
  },
};
