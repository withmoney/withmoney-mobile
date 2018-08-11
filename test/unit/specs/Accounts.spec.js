import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Accounts from '../../../src/pages/settings/Accounts';
import store from '../../../src/store';
import router from '../../../src/router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

const accounts = [
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
];

const mockAccounts = {
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


jest.mock('../../../src/services/accounts', () => ({
  list: () => Promise.resolve(mockAccounts),
}));

describe('Accounts Component', () => {
  beforeAll(() => {
    global.localStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({
        id: '1',
        name: 'name',
      })),
    };
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(Accounts, { store, localVue, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('with accounts', () => {
      const wrapper = mount(Accounts, { store, localVue, router });
      wrapper.setData({
        accounts,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
