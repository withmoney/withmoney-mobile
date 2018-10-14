import Moment from 'moment';
import VueMaterial from 'vue-material';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Toolbar from '../../../src/components/Toolbar';
import getters from '../../../src/store/getters';

const localVue = createLocalVue();


localVue.use(Vuex);
localVue.use(VueMaterial);

describe('Toolbar Component', () => {
  let store;
  let now;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        current_month: Moment(),
        state_month: Moment(),
        state_month_str: Moment().format('MMM YY'),
        next_month_str: Moment().add(1, 'month').format('MMM YY'),
        previous_month_str: Moment().subtract(1, 'month').format('MMM YY'),
      },
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
