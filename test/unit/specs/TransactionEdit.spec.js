import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import TransactionEdit from '../../../src/pages/TransactionEdit';
import store from '../../../src/store';
// import router from '../../../src/router';
import Transactions from '../../../src/services/transactions';

const localVueRender = createLocalVue();
const localVue = createLocalVue();

localVueRender.use(Vuex);
localVueRender.use(VueMaterial);
localVueRender.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMaterial);

const router = new VueRouter({
  name: 'transactioEdit',
  params: {
    id: 1,
  },
});

/* eslint global-require: "off" */
jest.mock('../../../src/services/transactions', () => {
  const mockedTransactions = require('./__mocks__/transactions');

  return {
    update: jest.fn().mockResolvedValue(mockedTransactions.transaction1),
    getTransaction: jest.fn().mockResolvedValue(mockedTransactions.transaction1),
    destroy: jest.fn().mockResolvedValue(),
  };
});

describe('TransactionEdit Component', () => {
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
      const wrapper = shallowMount(TransactionEdit, { store, localVue: localVueRender, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Beravior', () => {
    it('onSave', async () => {
      const mocks = {
        $route: {
          name: 'transactioEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(TransactionEdit, {
        localVue,
        store,
        router,
        mocks,
        stubs: ['router-link', 'router-view'],
      });

      await wrapper.vm.onSave({
        id: 1,
        name: 'name',
      });

      expect(Transactions.update).toBeCalled();
      expect(Transactions.update.mock.calls[0][0]).toBe(123);
      expect(Transactions.update.mock.calls[0][1]).toEqual({
        id: 1,
        name: 'name',
      });
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/',
        query: {
          type: 'out',
        },
      });
    });

    it('onConfirm', async () => {
      const mocks = {
        $route: {
          name: 'transactioEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(TransactionEdit, {
        propsData: {
          type: 'in',
        },
        localVue,
        store,
        router,
        mocks,
        stubs: ['router-link', 'router-view'],
      });

      await wrapper.vm.onConfirm({
        id: 1,
        name: 'name',
        type: 'out',
      });
      expect(Transactions.destroy).toBeCalled();
      expect(Transactions.destroy.mock.calls[0][0]).toBe(123);
      expect(mocks.$router.push).toBeCalled();
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/',
        query: {
          type: 'out',
        },
      });
    });
  });
});
