import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Toolbar from '../../../src/components/Toolbar';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Toolbar Component', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},

      // actions
    });
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(Toolbar, { store, localVue });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
