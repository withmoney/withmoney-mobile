import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Toolbar from '../../../src/components/Toolbar';
import state from '../../../src/store/state';
import getters from '../../../src/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Toolbar Component', () => {
  let store;
  let now;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
    });
  });

  beforeAll(() => {
    now = Date.now;
    Date.now = () => 1532473578215;
  });
  afterAll(() => {
    Date.now = now;
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(Toolbar, { store, localVue });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
