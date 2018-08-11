import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Categories from '../../../src/pages/settings/Categories';
import store from '../../../src/store';
import router from '../../../src/router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

const categories = [
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
];

const mockCategories = {
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


jest.mock('../../../src/services/categories', () => ({
  list: () => Promise.resolve(mockCategories),
}));

describe('Categories Component', () => {
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
      const wrapper = shallowMount(Categories, { store, localVue, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('with categories', () => {
      const wrapper = mount(Categories, { store, localVue, router });
      wrapper.setData({
        categories,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
