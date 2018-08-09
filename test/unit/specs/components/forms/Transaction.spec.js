import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import Transaction from '../../../../../src/components/forms/Transaction';

const localVue = createLocalVue();

localVue.use(VueMaterial);

const mockAccounts = {
  data: {
    data: [
      {
        id: 2,
        UserId: 1,
        name: 'Carteira',
        type: 'wallet',
        initalValue: '650.00',
        createdAt: '2018-08-04T14:33:21.000Z',
        updatedAt: '2018-08-04T14:33:21.000Z',
      },
      {
        id: 1,
        UserId: 1,
        name: 'Banco Inter',
        type: 'checking_account',
        initalValue: '505.18',
        createdAt: '2018-08-04T14:33:21.000Z',
        updatedAt: '2018-08-04T14:33:21.000Z',
      },
    ],
    pagination: {
      totalItems: 2,
      currentPage: 1,
      perPage: 100,
      totalPages: 1,
      nextPage: null,
      previousPage: null,
    },
  },
};

const mockCategories = {
  data: {
    data: [
      {
        id: 2,
        UserId: 1,
        name: 'Lanche',
        type: 'out',
        initalValue: '650.00',
        createdAt: '2018-08-04T14:33:21.000Z',
        updatedAt: '2018-08-04T14:33:21.000Z',
      },
      {
        id: 1,
        UserId: 1,
        name: 'Salario',
        type: 'in',
        createdAt: '2018-08-04T14:33:21.000Z',
        updatedAt: '2018-08-04T14:33:21.000Z',
      },
    ],
    pagination: {
      totalItems: 2,
      currentPage: 1,
      perPage: 100,
      totalPages: 1,
      nextPage: null,
      previousPage: null,
    },
  },
};

jest.mock('../../../../../src/services/accounts', () => ({
  get: () => Promise.resolve(mockAccounts),
}));

jest.mock('../../../../../src/services/categories', () => ({
  get: () => Promise.resolve(mockCategories),
}));

describe('Transaction Component', () => {
  describe('Render', () => {
    it('default', () => {
      const onSave = jest.fn();
      const wrapper = shallowMount(Transaction, {
        localVue,
        propsData: { onSave },
      });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('onSave', () => {
      const onSave = jest.fn();
      const wrapper = mount(Transaction, {
        localVue,
        propsData: {
          onSave,
        },
        sync: false,
      });

      wrapper.find('#save').trigger('click');

      expect(onSave.mock.calls[0][0]).toHaveProperty('name');
      expect(onSave.mock.calls[0][0]).toHaveProperty('value');
      expect(onSave.mock.calls[0][0]).toHaveProperty('AccountId');
      expect(onSave.mock.calls[0][0]).toHaveProperty('isPaid');
      expect(onSave.mock.calls[0][0]).toHaveProperty('type');
      expect(onSave.mock.calls[0][0]).toHaveProperty('transactionDate');

      expect(onSave.mock.calls[0][0].name).toBe('');
      expect(onSave.mock.calls[0][0].value).toBe('');
      expect(onSave.mock.calls[0][0].AccountId).toBe(0);
      expect(onSave.mock.calls[0][0].isPaid).toBe(false);
      expect(onSave.mock.calls[0][0].type).toBe('out');
      expect(onSave.mock.calls[0][0].transactionDate instanceof Date).toBe(true);
    });
  });
});
