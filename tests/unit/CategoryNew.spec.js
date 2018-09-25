import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import CategoryNew from '../../src/pages/settings/CategoryNew';
import store from '../../src/store';
import router from '../../src/router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

describe('CategoryNew Component', () => {
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
      const wrapper = shallowMount(CategoryNew, { store, localVue, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
