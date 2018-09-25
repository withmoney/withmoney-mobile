import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import CategoryEdit from '../../src/pages/settings/CategoryEdit';
import store from '../../src/store';
import Categories from '../../src/services/categories';

const localVueRender = createLocalVue();
const localVue = createLocalVue();

localVueRender.use(Vuex);
localVueRender.use(VueMaterial);
localVueRender.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMaterial);

const router = new VueRouter({
  name: 'CategoryEdit',
  params: {
    id: 1,
  },
});

/* eslint global-require: "off" */
jest.mock('../../src/services/categories', () => {
  const mockedCategories = require('./__mocks__/categories');

  return {
    update: jest.fn().mockResolvedValue(mockedCategories.category1),
    get: jest.fn().mockResolvedValue(mockedCategories.category1),
    destroy: jest.fn().mockResolvedValue(),
  };
});

describe('CategoryEdit Component', () => {
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
      const wrapper = shallowMount(CategoryEdit, { store, localVue: localVueRender, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Beravior', () => {
    it('onSave', async () => {
      const mocks = {
        $route: {
          name: 'CategoryEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(CategoryEdit, {
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

      expect(Categories.update).toBeCalled();
      expect(Categories.update.mock.calls[0][0]).toBe(123);
      expect(Categories.update.mock.calls[0][1]).toEqual({
        id: 1,
        name: 'name',
      });
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/settings/categories',
      });
    });

    it('onConfirm', async () => {
      const mocks = {
        $route: {
          name: 'CategoryEdit',
          params: {
            id: 123,
          },
        },
        $router: {
          push: jest.fn(),
        },
      };
      const wrapper = shallowMount(CategoryEdit, {
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
      expect(Categories.destroy).toBeCalled();
      expect(Categories.destroy.mock.calls[0][0]).toBe(123);
      expect(mocks.$router.push).toBeCalled();
      expect(mocks.$router.push.mock.calls[0][0]).toEqual({
        path: '/settings/categories',
      });
    });
  });
});
