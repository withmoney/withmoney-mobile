import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Transaction from '../../../../../src/components/forms/Transaction';
import store from '../../../../../src/store';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

const mock = {
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

jest.mock('../../../../../src/services/accounts', () => ({
  get: () => Promise.resolve(mock),
}));

describe('Transaction Component', () => {
  describe('Render', () => {
    it('default', () => {
      const onSave = jest.fn();
      const wrapper = shallowMount(Transaction, {
        store,
        localVue,
        propsData: { onSave },
      });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
