import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AccountEdit from '../../src/pages/settings/AccountEdit';
import store from '../../src/store';
import Accounts from '../../src/services/accounts';

const localVueRender = createLocalVue();
const localVue = createLocalVue();

localVueRender.use(Vuex);
localVueRender.use(VueMaterial);
localVueRender.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMaterial);

const router = new VueRouter({
  name: 'AccountEdit',
  params: {
    id: 1,
  },
});

/* eslint global-require: "off" */
jest.mock('../../src/services/accounts', () => {
  const mockedAccounts = require('./__mocks__/accounts');

  return {
    update: jest.fn().mockResolvedValue(mockedAccounts.account1),
    get: jest.fn().mockResolvedValue(mockedAccounts.account1),
    destroy: jest.fn().mockResolvedValue(),
  };
});

describe('AccountEdit Component', () => {
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
      const wrapper = shallowMount(AccountEdit, { store, localVue: localVueRender, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Beravior', () => {
    it('onSave', async () => {
      const mocks = {
        $route: {
          name: 'AccountEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(AccountEdit, {
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

      expect(Accounts.update).toBeCalled();
      expect(Accounts.update.mock.calls[0][0]).toBe(123);
      expect(Accounts.update.mock.calls[0][1]).toEqual({
        id: 1,
        name: 'name',
      });
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/settings/accounts',
      });
    });

    it('onConfirm', async () => {
      const mocks = {
        $route: {
          name: 'AccountEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(AccountEdit, {
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
      expect(Accounts.destroy).toBeCalled();
      expect(Accounts.destroy.mock.calls[0][0]).toBe(123);
      expect(mocks.$router.push).toBeCalled();
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/settings/accounts',
      });
    });
  });
});
