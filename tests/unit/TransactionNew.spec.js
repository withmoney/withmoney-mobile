import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Moment from 'moment';
import TransactionNew from '../../src/pages/TransactionNew';
import actions from '../../src/store/actions';
import getters from '../../src/store/getters';
import router from '../../src/router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

describe('TransactionNew Component', () => {
  let store;
  let nowMock;

  beforeAll(() => {
    nowMock = Date.now;
    Date.now = () => new Date('2018-09-24T00:00:00-00:00').getTime();
    store = new Vuex.Store({
      state: {
        state_month: Moment(),
      },
      getters,
      actions,
    });

    global.localStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({
        id: '1',
        name: 'name',
      })),
    };
  });

  afterAll(() => {
    Date.now = nowMock;
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(TransactionNew, { store, localVue, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
